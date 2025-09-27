from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from src.models.documentModel import Document, DocumentRead


#TP
class TpBase(SQLModel):
    titre: str
    description: str

class Tp(TpBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    index: int #faire en sorte qu'il soit incrementé automatiquement

    cours_id: int = Field(foreign_key="cours.id")
    cours: "Cours" = Relationship(back_populates="tp")
    documents: List["Document"] = Relationship(back_populates="tp")

class TpRead(TpBase):
    id: int
    index: int
    documents: List["DocumentRead"]

class TpWrite(TpBase):
    cours_id: int

class TpWriteInternal(TpBase):
    cours_id: int
    index: int

class TpUpdate(TpBase):
    pass