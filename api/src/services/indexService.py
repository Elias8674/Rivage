import random
from sqlmodel import Session, select
from fastapi import Depends
from src.models.models import get_session
from src.models.tpModel import Tp


# Service pour changer l'index d'un tp
"""

"""
def switchTpByIndex(tp_id, new_index, db = next(get_session())):

    #récupère la liste des TP selon le cours
    tp_base = db.get(Tp, tp_id)
    list_tp = db.exec(select(Tp).where(Tp.cours_id == tp_base.cours_id)).all()

    #vérifie si le tp_id vas augmenter ou réduire son index
    if tp_base.index > new_index:
        sens = 1 #TO DO changer le nom de la variable
    else:
        sens = -1

    #crée la liste des tp entre tp_id et le new_index
    if sens:
        list_tp = list_tp[new_index:tp_base.index]

        for tp in list_tp:
            db_tp = db.get(Tp, tp.id)
            db_tp.index = db_tp.index - 1
            db.add(db_tp)
        db.commit()


    else:
        list_tp = list_tp[tp_base.index + 1:new_index + 1]

        for tp in list_tp:
            db_tp = db.get(Tp, tp.id)
            db_tp.index = db_tp.index + 1
            db.add(db_tp)
        db.commit()
