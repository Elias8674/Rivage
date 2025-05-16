from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship










engine = create_engine(
                        "postgresql://api:lycee@database:5432/lycee",
                        pool_timeout=30)

def get_session():
    with Session(engine) as session:
        yield session
