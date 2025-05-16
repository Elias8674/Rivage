from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.endpoints.dependencies import get_db
from src.models.tpModel import TpWrite, Tp, TpRead


router = APIRouter(prefix="/tp", tags=["tp"])

@router.post("/", response_model=TpWrite)
def create_tp(tp: TpWrite, db: Session = Depends(get_db)):
    """
    Crée un nouveau TP.
    """
    db_tp = Tp.model_validate(tp)
    db.add(db_tp)
    db.commit()
    db.refresh(db_tp)
    return db_tp

@router.get("/{tp_id}", response_model=TpRead)
def read_tp_by_id(tp_id: int, db: Session = Depends(get_db)):
    """
    Récupère un TP, et les documents lié par son ID.
    """
    tp = db.get(Tp, tp_id)
    if not tp:
        raise HTTPException(status_code=404, detail="TP non trouvé")
    return tp