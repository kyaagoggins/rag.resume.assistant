# Neo4j and Qdrant interactions

import os
from PyPDF2 import PdfReader

def load_documents(folder_path="documents"):
    docs = []
    
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        # Handle .txt files
        if filename.lower().endswith(".txt"):
            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()
                docs.append({"filename": filename, "text": text})

        # Handle .pdf files
        elif filename.lower().endswith(".pdf"):
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""  # Extract each page safely
            docs.append({"filename": filename, "text": text})

    return docs
