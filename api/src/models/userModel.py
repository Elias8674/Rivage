from sqlmodel import Field, Session, SQLModel, create_engine
from typing import Optional

from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship


#Token
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


#User (prof)
class UserBase(SQLModel):
    nom: str
    prenom: str
    email: str
    password: str

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    role_id: int = Field(foreign_key="role.id")
    role: "Role" = Relationship(back_populates="users")

class UserRead(UserBase):
    id: int
    role_id: int
    role_nom: role.nom

class UserWrite(UserBase):
    role_id: int

#Role
class RoleBase(SQLModel):
    nom: str
    description: str

class Role(RoleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    users: List["User"] = Relationship(back_populates="role")

class RoleRead(RoleBase):
    id: int
    users: List["UserRead"]

class RoleWrite(RoleBase):
    pass