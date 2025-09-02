import os
from dotenv import load_dotenv

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker


load_dotenv()

database_url = os.getenv("DATABASE_URL")
database_url_async = os.getenv("DATABASE_URL_ASYNC")

engine_async = create_async_engine(database_url_async,
                                   pool_size=5,        # Nombre de connexions permanentes
                                    max_overflow=10,    # Connexions supplémentaires temporaires
                                    pool_timeout=30,    # Temps d'attente pour obtenir une connexion
                                    pool_recycle=3600,  # Renouvellement des connexions (en secondes)
                                    pool_pre_ping=True) # Vérification de la connexion avant utilisation)
engine_sync = create_engine(database_url,
                            pool_size=5,        # Nombre de connexions permanentes
                            max_overflow=10,    # Connexions supplémentaires temporaires
                            pool_timeout=30,    # Temps d'attente pour obtenir une connexion
                            pool_recycle=3600,  # Renouvellement des connexions (en secondes)
                            pool_pre_ping=True)

async_session_maker = async_sessionmaker(engine_async, expire_on_commit=False)

async def get_async_session():
    async with async_session_maker() as session:
        yield session

def get_session():
    with Session(engine_sync) as session:
        yield session
