import re
from typing import List
from .llm import parse_text_to_graph
from .models import Chunk, ResumeRelationships

def chunk_resume_text(text: str, file_id: str) -> List[Chunk]:
    """
    Split resume text into chunks by section headings (Experience, Education, Skills).
    Returns list of chunks with ids, section labels, and text.
    """
    sections = re.split(r"(?i)(?=experience|education|skills|projects|summary)", text)
    chunks = []
    for idx, sec in enumerate(sections):
        sec = sec.strip()
        if not sec:
            continue
        label = sec.split("\n", 1)[0].split()[0].capitalize()
        chunks.append(Chunk(id=f"{file_id}-chunk-{idx+1}", section=label, text=sec))
    return chunks

def extract_graph_from_resume(text: str, file_id: str) -> List[ResumeRelationships]:
    chunks = chunk_resume_text(text, file_id)
    relationships = []
    for chunk in chunks:
        prompt = f"FILE_ID: {file_id}\nCHUNK_ID: {chunk.id}\nSECTION: {chunk.section}\nTEXT:\n{chunk.text}"
        parsed_graph = parse_text_to_graph(prompt)
        for rel in parsed_graph.graph:
            relationships.append(
                ResumeRelationships(
                    node=rel.node,
                    target_node=rel.target_node,
                    relationship=rel.relationship,
                    chunk_id=chunk.id,
                    file_id=file_id,
                    section=chunk.section
                )
            )
    return relationships
