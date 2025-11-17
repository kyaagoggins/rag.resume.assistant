# pydantic models 

from pydantic import BaseModel
from typing import List, Dict

class Chunk(BaseModel):
    id: str
    section: str
    text: str

class ResumeRelationships(BaseModel):
    node: str
    target_node: str
    relationship: str
    chunk_id: str
    file_id: str
    section: str