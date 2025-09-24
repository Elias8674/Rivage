from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from src.models.tpModel import Tp, TpRead
from src.services.colorService import choice_color

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


#Cours
class CoursBase(SQLModel):
    nom: str

class Cours(CoursBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tp: List["Tp"] = Relationship(back_populates="cours")
    couleur_id: int = Field(default_factory=choice_color, foreign_key="couleur.id")
    couleur: Optional["Couleur"] = Relationship(back_populates="cours")

class CoursRead(CoursBase):
    id: int
    couleur_id: int

class CoursReadWithTp(CoursBase):
    id: int
    couleur_id: int
    tp: List["TpRead"]

class CoursWrite(CoursBase):
    pass

class CoursUpdate(CoursBase):
    nom: Optional[str] = None
    couleur_id: Optional[int] = None
