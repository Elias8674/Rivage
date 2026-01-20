from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from typing import List
import os

class EmailSchema(BaseModel):
    email: List[EmailStr]

def _get_conf() -> ConnectionConfig:
    password = os.getenv('PASSWORD_EMAIL_SERVER')
    if not password:
        raise RuntimeError("Missing env var PASSWORD_EMAIL_SERVER (Gmail app password).")
    return ConnectionConfig(
        MAIL_USERNAME=os.getenv('MAIL_USERNAME', "rivage.learning@gmail.com"),
        MAIL_PASSWORD=password,
        MAIL_FROM=os.getenv('MAIL_FROM', "rivage.learning@gmail.com"),
        MAIL_PORT=int(os.getenv('MAIL_PORT', 587)),
        MAIL_SERVER=os.getenv('MAIL_SERVER', "smtp.gmail.com"),
        MAIL_STARTTLS=os.getenv('MAIL_STARTTLS', 'True') == 'True',
        MAIL_SSL_TLS=os.getenv('MAIL_SSL_TLS', 'False') == 'True',
        USE_CREDENTIALS=True,
        VALIDATE_CERTS=True,
    )

def sendEmail(background_tasks: BackgroundTasks, email_schema: EmailSchema, text: str) -> None:
    """
    Envois un mail, utilise une tâche en arrière plan.
    """
    conf = _get_conf()
    message = MessageSchema(
        subject="Fastapi mail module",
        recipients=email_schema.email,
        body=text,
        subtype=MessageType.plain
    )
    fm = FastMail(conf)
    background_tasks.add_task(fm.send_message, message)
