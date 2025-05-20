from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware


from src.endpoints.cours import router as cours_router
from src.endpoints.tp import router  as tp_router
from src.endpoints.documents import router as documents_router

from src.models.userModel import User
from src.models.userModel import UserCreate, UserRead, UserUpdate
from src.endpoints.auth import auth_backend, current_active_user, fastapi_users

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
    "http://localhost"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclure vos routers
#app.include_router(cours.router, prefix="/cours")
app.include_router(cours_router)
app.include_router(tp_router)
app.include_router(documents_router)

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