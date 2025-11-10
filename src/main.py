# from fastapi import FastAPI

# app = FastAPI()

# @app.get("/")
# def root():
#     return {"message": "Backend is running"}

# from fastapi.middleware.cors import CORSMiddleware

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:4200"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
# import os
# import sys

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# from backend.backend import load_documents, process_and_store_resume

app = FastAPI()

# Enable CORS so Angular can call the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # or put your Angular URL
    allow_methods=["*"],
    allow_headers=["*"],
)

# DOCUMENTS_DIR = "documents"
# os.makedirs(DOCUMENTS_DIR, exist_ok=True)

# @app.post("/upload")
# async def upload_doc(file: UploadFile = File(...)):
#     file_path = os.path.join(DOCUMENTS_DIR, file.filename)

#     with open(file_path, "wb") as f:
#         f.write(await file.read())

#     docs = load_documents(DOCUMENTS_DIR)

#     return {"message": "File uploaded!", "docs": docs}


# @app.post("/process")
# async def process(doc_text: str):
#     result = process_and_store_resume(doc_text, file_id="1")
#     return result

@app.get("/")
def root():
    return {"message": "Backend is working!"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    # For now, just return filename
    return {"filename": file.filename}

@app.post("/process")
async def process_text(text: str):
    # For now, just echo the text
    return {"processed_text": text.upper()}