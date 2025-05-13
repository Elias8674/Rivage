from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from src.endpoints.cours import router as cours_router
from src.endpoints.tp import router  as tp_router
from src.endpoints.documents import router as documents_router


#Creation du moteur SQLAlchemy
#DATABASE_URL = "postgresql://endpoints:lycee@database:5432/lycee"
#engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI(
    title="API",
    version="0.0.1",
)

origins = [
    "http://localhost:5173",
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

@app.get("/")
def read_root():
    return {"Hello": "World"}