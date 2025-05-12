from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.endpoints.dependencies import get_db
from src.models.models import TpWrite, Tp


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