from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from src.models.tpModel import Tp, TpRead

#Cours
class CoursBase(SQLModel):
    nom: str
    couleur_id: Optional[int] = Field(default=None, foreign_key="couleur.id")

class Cours(CoursBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tp: List["Tp"] = Relationship(back_populates="cours")
    couleur: Optional["Couleur"] = Relationship(back_populates="cours")

class CoursRead(CoursBase):
    id: int

class CoursReadWithTp(CoursBase):
    id: int
    tp: List["TpRead"]

class CoursWrite(CoursBase):
    pass

class CoursUpdate(CoursBase):
    nom: Optional[str] = None
    couleur_id: Optional[int] = None

#Couleur
class CouleurBase(SQLModel):
    background_color: str  # Correction de la faute de frappe
    text_color: str

class Couleur(CouleurBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    cours: List["Cours"] = Relationship(back_populates="couleur")

class CouleurRead(CouleurBase):
    id: int

class CouleurWrite(CouleurBase):
    pass