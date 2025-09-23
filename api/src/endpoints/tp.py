from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.endpoints.dependencies import get_db
from src.models.tpModel import TpWrite, Tp, TpRead, TpUpdate


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

@router.put("/{tp_id}", response_model=TpUpdate)
def update_tp_by_id(tp_id: int, tp: TpUpdate, db: Session = Depends(get_db)):
    """
    Mettre à jour un TP par son ID.
    :param tp_id:
    :param tp:
    :param db:
    :return:
    """
    # Récupérer l'objet existant
    db_tp = db.get(Tp, tp_id)
    if not db_tp:
        raise HTTPException(status_code=404, detail="TP non trouvé")

    # Mettre à jour les champs modifiés uniquement
    tp_data = tp.model_dump(exclude_unset=True)
    for key, value in tp_data.items():
        setattr(db_tp, key, value)

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