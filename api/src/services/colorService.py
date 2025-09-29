import random
from sqlmodel import Session, select
from fastapi import Depends
from src.models.models import get_session


def choice_color(db = next(get_session())):
    """
    choisie une couleur qui n'est pas encore utilisé par un cours
    sinon choisie une couleur au hasard
    :param db:
    :param all_color_id:
    :param cours_color:
    :return:
    """
    from src.models.coursModel import Cours, Couleur

    #call db pour récupérer toute les ID de couleur et toute les ID des couleurs dans cours

    colors_id = db.exec(select(Couleur.id)).all()
    cours_color_id = db.exec(select(Cours.couleur_id)).all()

    #colors_id = [row[0] for row in db.exec(select(Couleur.id))]
    #cours_color_id = [row[0] for row in db.exec(select(Cours.couleur_id))]



    final_color = [i for i in colors_id if i not in cours_color_id]
    if not final_color:
        color = colors_id[random.randrange(0, len(colors_id))]
    else:
        color = final_color[random.randrange(0, len(final_color))]
    return int(color)
