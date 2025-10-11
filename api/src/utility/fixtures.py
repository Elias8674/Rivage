from datetime import datetime, timedelta
import random
from typing import List

# ... existing code ...
from sqlmodel import Session, select
from src.endpoints.dependencies import get_db
from src.models.coursModel import Cours, CoursWrite
from src.models.tpModel import Tp, TpWrite
# ... existing code ...

def create_courses_fixtures():
    """Crée des données de cours pour peupler la base de données."""
    courses = [
        {
            "nom": "Mathématiques",
            "couleur": "#3B82F6"  # Bleu
        },
        {
            "nom": "Physique-Chimie",
            "couleur": "#10B981"  # Vert
        }
        # ... existing code ...
    ]
    return courses

# ... existing code ...

def get_all_fixtures():
    """Retourne toutes les fixtures pour l'initialisation de la base de données."""
    return {
        "courses": create_courses_fixtures(),
        "tps": create_tp_fixtures()
    }

def create_cours(cours: CoursWrite, db: Session):
    """
    Crée un nouveau cours.
    """
    db_cours = Cours.model_validate(cours)
    db.add(db_cours)
    db.commit()
    db.refresh(db_cours)

def create_tp(tp: TpWrite, db: Session):
    """
    Crée un nouveau TP.
    """
    db_tp = Tp.model_validate(tp)
    db.add(db_tp)
    db.commit()
    db.refresh(db_tp)

def populate_database():
    """Fonction principale pour peupler la base de données avec les fixtures."""
    fixtures = get_all_fixtures()

    print(f"Création de {len(fixtures['courses'])} cours...")
    print(f"Création de {len(fixtures['tps'])} TPs...")

    # Ouvrir explicitement une session en réutilisant le générateur get_db()
    gen = get_db()
    db = next(gen)
    try:
        for course_data in fixtures['courses']:
            create_cours(course_data, db=db)
        for tp_data in fixtures['tps']:
            create_tp(tp_data, db=db)
    finally:
        # Déclenche le finally de get_db() pour fermer la session proprement
        try:
            gen.close()
        except Exception:
            pass

if __name__ == "__main__":
    populate_database()