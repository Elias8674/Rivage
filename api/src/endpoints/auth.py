import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status

from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin, models
from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase

from sqlmodel import Session


from src.models.userModel import User, get_user_db

from src.endpoints.dependencies import get_db
from src.models.models import get_async_session

SECRET = "random_secret_key"


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


#bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")
cookie_transport = CookieTransport(
    cookie_max_age=3600,
    cookie_samesite="lax",
    cookie_name="fastapiusersauth")

def get_jwt_strategy() -> JWTStrategy[models.UP, models.ID]:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])
current_active_user = fastapi_users.current_user(active=True)



router = APIRouter(prefix="/me", tags=["me"])

@router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT)
def delete_me(
        current_user: User = Depends(current_active_user),
        db: Session = Depends(get_db)
    ):
    user_in_this_session = db.get(User, current_user.id)
    if not user_in_this_session:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    db.delete(user_in_this_session)
    db.commit()
