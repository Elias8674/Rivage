from uuid import UUID

from sqlmodel import Field, Session, SQLModel, create_engine, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Column, Enum as SQLEnum


class InvitationStatus(PyEnum):
    pending = "pending"
    used = "used"
    expired = "expired"


class InvitationBase(SQLModel):
    email: str
    token: str

class Invitation(InvitationBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    invited_by_id: int = Field(foreign_key="user.id")

    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime
    used_at: Optional[datetime] = None
    status: InvitationStatus = Field(default=InvitationStatus.pending)


class InvitationRead(InvitationBase):
    id: int
    invited_by_id: int

class InvitationWrite(InvitationBase):
    invited_by_id: int
    expires_at: datetime

class InvitationUpdate(InvitationBase):
    used_at: Optional[datetime]
    status: InvitationStatus