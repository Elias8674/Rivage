import os

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from src.endpoints.cours import router as cours_router
from src.endpoints.tp import router  as tp_router
from src.endpoints.documents import router as documents_router
from src.endpoints.couleur import router as couleur_router

from src.models.userModel import User
from src.models.userModel import UserCreate, UserRead, UserUpdate
from src.endpoints.auth import auth_backend, current_active_user, fastapi_users

from alembic.config import Config
from alembic import command

#Pour les mails :
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from typing import List

import logging

#Creation du moteur SQLAlchemy
#DATABASE_URL = "postgresql://endpoints:lycee@database:5432/lycee"
#engine = create_engine(DATABASE_URL, echo=True)


app = FastAPI(
    title="API",
    version="0.1.0",
    root_path="/api",
)

origins = [
    "http://localhost:5173",
    "http://localhost",
    "http://frontend",
    "http://frontend:5173"
]

app.add_middleware(
    CORSMiddleware,
    #allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure vos routers
#app.include_router(cours.router, prefix="/cours")
app.include_router(cours_router)
app.include_router(tp_router)
app.include_router(documents_router)
app.include_router(couleur_router)

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}







password_mail_server = os.getenv('PASSWORD_EMAIL_SERVER')


class EmailSchema(BaseModel):
    email: List[EmailStr]


conf = ConnectionConfig(
    MAIL_USERNAME="rivage.learning@gmail.com",
    MAIL_PASSWORD=password_mail_server,
    MAIL_FROM="rivage.learning@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

@app.post("/email")
async def simple_send(email: EmailSchema) -> JSONResponse:
    html = """<p>Hi this test mail, thanks for using Fastapi-mail</p> """

    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=email.dict().get("email"),
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})