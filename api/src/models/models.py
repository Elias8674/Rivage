from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship


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



#TP
class TpBase(SQLModel):
    titre: str
    description: str

class Tp(TpBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    index: int #faire en sorte qu'il soit incrementé automatiquement

    cours_id: int = Field(foreign_key="cours.id")
    cours: Cours = Relationship(back_populates="tp")

class TpRead(TpBase):
    id: int
    index: int

class TpWrite(TpBase):
    index: int
    cours_id: int




engine = create_engine("postgresql://api:lycee@database:5432/lycee")

def get_session():
    with Session(engine) as session:
        yield session
