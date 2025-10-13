from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.endpoints.dependencies import get_db
from src.models.coursModel import CoursRead, CoursWrite, Cours, CoursReadWithTp, CoursUpdate
from src.models.tpModel import Tp
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

@router.post("/", response_model=CoursRead)
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

@router.patch("/{cours_id}", response_model=CoursRead)
def update_cours_by_id(cours_id: int, cours: CoursUpdate, db: Session = Depends(get_db)):
    """
    Met à jour un cours par son ID.
    """
    db_cours = db.get(Cours, cours_id)
    if not cours:
        raise HTTPException(status_code=404, detail="Cours non trouvé")

    cours_data = cours.model_dump(exclude_unset=True)
    for key, value in cours_data.items():
        setattr(db_cours, key, value)

    db.add(db_cours)
    db.commit()
    db.refresh(db_cours)
    return db_cours

@router.delete("/{cours_id}")
def delete_cours(cours_id: int, db: Session = Depends(get_db)):
    """
    supprime un cours par son ID.
    :param cours_id:
    :param db:
    :return:
    """
    db_cours = db.get(Cours, cours_id)
    if not db_cours:
        raise HTTPException(status_code=404, detail="Cours non trouvé, suppression impossible")

    db_list_tp = db.exec(select(Tp).where(Tp.cours_id == cours_id)).all()
    for tp in db_list_tp:
        db.delete(tp)

    db.delete(db_cours)
    db.commit()

    return {"message": "Cours supprimé avec succès"}