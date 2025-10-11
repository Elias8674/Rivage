from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, func

from src.endpoints.dependencies import get_db
from src.models.tpModel import TpWrite, Tp, TpRead, TpUpdate, TpWriteInternal
from src.services.indexService import switchTpByIndex, switchTPtoLastPlace

router = APIRouter(prefix="/tp", tags=["tp"])

@router.post("/", response_model=TpWriteInternal)
def create_tp(tp: TpWrite, db: Session = Depends(get_db)):
    """
    Crée un nouveau TP.
    """
    cours_id = tp.cours_id
    count = db.exec(
        select(func.count(Tp.id)).where(Tp.cours_id == cours_id)
    ).first()

    # Le nouvel index est le nombre existant + 1
    next_index = (count or 0) + 1

    tp_obj = TpWriteInternal(
        titre=tp.titre,
        description=tp.description,
        cours_id=tp.cours_id,
        index=next_index
    )

    db_tp = Tp.model_validate(tp_obj)
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

@router.put("/{tp_id}/{index}", name="Interchange l'index d'un TP avec un autre.")
def update_tp_index_by_id(tp_id: int, index: int, db: Session = Depends(get_db)):
    """
    Interchange l'index d'un TP avec un autre.
    :param tp_id:
    :param index:
    :param db:
    :return:
    """

    switchTpByIndex(tp_id, index)

    return {"message": "Opération réussie"}


@router.get("/{tp_id}", response_model=TpRead)
def read_tp_by_id(tp_id: int, db: Session = Depends(get_db)):
    """
    Récupère un TP, et les documents lié par son ID.
    """
    tp = db.get(Tp, tp_id)
    if not tp:
        raise HTTPException(status_code=404, detail="TP non trouvé")
    return tp

@router.delete("/{tp_id}")
def delete_tp(tp_id: int, db: Session = Depends(get_db)):
    """
    Supprime un TP par son ID.
    :param document_id: 
    :param db: 
    :return: 
    """

    tp = db.get(Tp, tp_id)
    if not tp:
        raise HTTPException(status_code=404, detail="Tp non trouvé")

    switchTPtoLastPlace(tp_id, db)

    db.delete(tp)
    db.commit()

    return {'message': 'Cours supprimer avec succès'}
