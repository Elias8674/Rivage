from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

from src.config import database_url, database_url_async

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker


engine_async = create_async_engine(database_url_async, echo=True)
engine_sync = create_engine(database_url, echo=True)
async_session_maker = async_sessionmaker(engine_async, expire_on_commit=False)

async def get_async_session():
    async with async_session_maker() as session:
        yield session

def get_session():
    with Session(engine_sync) as session:
        yield session
