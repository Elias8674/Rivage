from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from src.models.tpModel import Tp, TpRead

#Cours
class CoursBase(SQLModel):
    nom: str
    couleur: str

class Cours(CoursBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tp: List["Tp"] = Relationship(back_populates="cours")

class CoursRead(CoursBase):
    id: int

class CoursReadWithTp(CoursBase):
    id: int
    tp: List["TpRead"]

class CoursWrite(CoursBase):
    pass