import random
from sqlmodel import Session, select
from fastapi import Depends
from src.models.models import get_session
from src.models.tpModel import Tp


# Service pour changer l'index d'un tp

def switchTpByIndex(tp_id, new_index, db = next(get_session())):

    try:
        #récupère la liste des TP selon le cours
        tp_base = db.get(Tp, tp_id)
        list_tp = db.exec(select(Tp).where(Tp.cours_id == tp_base.cours_id).order_by(Tp.index)).all()

        #vérifie si le tp_id vas augmenter ou réduire son index
        if tp_base.index > new_index:
            direction = 1 #TO DO changer le nom de la variable
        else:
            direction = -1


        if direction == 1:
            list_tp = [tp for tp in list_tp if new_index <= tp.index < tp_base.index]
            for tp in list_tp:
                db_tp = tp
                db_tp.index = db_tp.index + 1
                db.add(db_tp)


        else:
            list_tp = [tp for tp in list_tp if tp_base.index < tp.index <= new_index]

            #list_tp = list_tp[tp_base.index + 1:new_index + 1]
            for tp in list_tp:
                db_tp = tp
                db_tp.index = db_tp.index - 1
                db.add(db_tp)

        tp_base.index = new_index
        db.add(tp_base)
        db.commit()
        db.refresh(tp_base)

    except Exception as e:
        db.rollback()  # ← CRUCIAL
        raise HTTPException(status_code=500, detail=f"Erreur lors du changement d'index: {str(e)}")

    return True
