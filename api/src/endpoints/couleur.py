from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.endpoints.dependencies import get_db
from src.models.coursModel import CouleurWrite, Couleur, CouleurRead

router = APIRouter(prefix="/couleur", tags=["couleur"])

@router.get("/{couleur_id}", response_model=CouleurRead)
def get_couleur_by_id(couleur_id: int, db: Session = Depends(get_db)):
    """
    Récupérer une couleur par son ID.
    """
    db_couleur = db.get(Couleur, couleur_id)
    if not db_couleur:
        raise HTTPException(status_code=404, detail="Couleur non trouvée")
    return db_couleur