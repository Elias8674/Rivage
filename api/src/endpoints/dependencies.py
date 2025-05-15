from sqlmodel import Session
from fastapi import Depends

from src.models.models import get_session

# Dépendance pour obtenir une session de base de données
def get_db() -> Session:
    return next(get_session())