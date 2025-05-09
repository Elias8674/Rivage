
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.endpoints.dependencies import get_db
from src.models.models import CoursRead, CoursWrite, Cours

router = APIRouter(prefix="/cours", tags=["cours"])

@router.get("/", response_model=List[CoursRead])
def get_cours(db: Session = Depends(get_db)):
    """
    Récupère tous les cours.
    """
    cours = db.exec(select(Cours)).all()
    return cours

@router.post("/", response_model=CoursWrite)
def create_cours(cours: CoursWrite, db: Session = Depends(get_db)):
    """
    Crée un nouveau cours.
    """
    db_cours = Cours.model_validate(cours)
    db.add(db_cours)
    db.commit()
    db.refresh(db_cours)
    return db_cours