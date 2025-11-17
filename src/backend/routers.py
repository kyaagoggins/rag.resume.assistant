#all API endpoints

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
from .resume import extract_graph_from_resume, chunk_resume_text
from .services import store_relationships_to_neo4j, create_qdrant_collection, send_chunks_to_qdrant
from .storage import load_documents

app = FastAPI()

# Enable CORS for Angular frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def test_api():
    return {"message": "Backend is up!"}

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    os.makedirs("documents", exist_ok=True)
    file_path = os.path.join("documents", file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    docs = load_documents("documents")
    results = []

    for doc in docs:
        file_id = "1"  # generate unique ID in production
        rels = extract_graph_from_resume(doc["text"], file_id)
        store_relationships_to_neo4j(rels)
        chunks = chunk_resume_text(doc["text"], file_id)
        create_qdrant_collection()
        send_chunks_to_qdrant(chunks, file_id)
        results.append({"filename": doc["filename"], "relationships": rels, "chunks": chunks})
    
    return {"results": results}
