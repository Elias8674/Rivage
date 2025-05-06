from fastapi import FastAPI

from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship


#Model
class UserBase(SQLModel):
    username: str
    mail: str = Field(unique=True)

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    mail: str = Field(unique=True)

class UserCreate(SQLModel):
    username: str
    mail: str

class UserRead(SQLModel):
    id: int
    username: str
    mail: str


#Creation du moteur SQLAlchemy
DATABASE_URL = "postgresql://api:lycee@database:5432/lycee"
engine = create_engine(DATABASE_URL, echo=True)


#Opérations CRUD
def read_users():
    with Session(engine) as session:
        users = session.query(User).all()
        return users
def create_user(user: UserCreate):
    with Session(engine) as session:
        db_user = User.model_validate(user)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users", response_model=List[User])
def get_users():
    return read_users();

@app.post("/user", response_model=UserRead)
def post_user(user: UserCreate):
    return create_user(user);