from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship


#Documents
class DocumentBase(SQLModel):
    nom: str
    description: Optional[str] = None
    path: str

class Document(DocumentBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tp_id: int = Field(foreign_key="tp.id")
    tp: "Tp" = Relationship(back_populates="documents")

class DocumentRead(DocumentBase):
    id: int
    tp_id: int

class DocumentWrite(DocumentBase):
    tp_id: int
