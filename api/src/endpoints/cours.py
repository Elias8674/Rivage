from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.endpoints.dependencies import get_db
from src.models.coursModel import CoursRead, CoursWrite, Cours, CoursReadWithTp
from src.endpoints.auth import auth_backend, current_active_user, fastapi_users
from src.models.userModel import User


router = APIRouter(prefix="/cours", tags=["cours"])

@router.get("/", response_model=List[CoursRead])
def get_cours(db: Session = Depends(get_db)):
    """
    Récupère tous les cours.
    """
    cours = db.exec(select(Cours)).all()
    return cours

@router.post("/", response_model=CoursWrite)
def create_cours(cours: CoursWrite, db: Session = Depends(get_db), user: User = Depends(current_active_user)):
    """
    Crée un nouveau cours.
    """
    db_cours = Cours.model_validate(cours)
    db.add(db_cours)
    db.commit()
    db.refresh(db_cours)
    return db_cours

@router.get("/{cours_id}", response_model=CoursReadWithTp)
def get_cours_by_id(cours_id: int, db: Session = Depends(get_db)):
    """
    Récupère un cours et les tp lié par son ID.
    """
    cours = db.get(Cours, cours_id)
    if not cours:
        raise HTTPException(status_code=404, detail="Cours non trouvé")
    return cours


