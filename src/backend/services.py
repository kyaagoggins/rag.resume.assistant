#app logic

import re
from neo4j import GraphDatabase
from qdrant_client import QdrantClient
from qdrant_client.http import models
import uuid
from .models import ResumeRelationships, Chunk
from openai import OpenAI
import os

# Neo4j setup
neo4j_uri = os.getenv("NEO4J_URI")
neo4j_user = os.getenv("NEO4J_USER")
neo4j_password = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))

def safe_relationship_type(r: str) -> str:
    """
    Convert any string to a valid Neo4j relationship type:
    - Only letters, numbers, and underscores
    - Must start with a letter (prepend 'R_' if it starts with a number)
    - Collapse multiple underscores
    - Uppercase
    """
    r = re.sub(r"[^a-zA-Z0-9]", "_", r)
    r = re.sub(r"_+", "_", r)
    if re.match(r"^\d", r):
        r = f"R_{r}"
    return r.upper()

def store_relationships_to_neo4j(rels: list[ResumeRelationships]):
    with driver.session() as session:
        for rel in rels:
            r_type = safe_relationship_type(rel.relationship)
            query = f"""
            MERGE (a:Entity {{name: $node_a}})
            MERGE (b:Entity {{name: $node_b}})
            MERGE (a)-[r:{r_type}]->(b)
            SET r.chunk_id = $chunk_id, r.file_id = $file_id, r.section = $section
            """
            session.run(query, {
                "node_a": rel.node,
                "node_b": rel.target_node,
                "chunk_id": rel.chunk_id,
                "file_id": rel.file_id,
                "section": rel.section
            })

# Qdrant setup
qdrant = QdrantClient(host="localhost", port=6333)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
COLLECTION_NAME = "resume_chunks"

def create_qdrant_collection():
    qdrant.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=models.VectorParams(size=1536, distance=models.Distance.COSINE)
    )

def embed_text(text: str):
    emb = client.embeddings.create(model="text-embedding-3-small", input=text)
    return emb.data[0].embedding

def send_chunks_to_qdrant(chunks: list[Chunk], file_id: str):
    points = []
    for chunk in chunks:
        vector = embed_text(chunk.text)
        points.append(models.PointStruct(
            id=str(uuid.uuid4()),
            vector=vector,
            payload={
                "file_id": file_id,
                "chunk_id": chunk.id,
                "section": chunk.section,
                "text": chunk.text
            }
        ))
    qdrant.upsert(collection_name=COLLECTION_NAME, points=points)
