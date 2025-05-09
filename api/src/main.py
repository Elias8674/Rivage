from fastapi import FastAPI

#from src.endpoints.cours import cours
from src.endpoints.cours import router as cours_router


#Creation du moteur SQLAlchemy
#DATABASE_URL = "postgresql://endpoints:lycee@database:5432/lycee"
#engine = create_engine(DATABASE_URL, echo=True)

app = FastAPI(
    title="API",
    version="0.0.1",
)

# Inclure vos routers
#app.include_router(cours.router, prefix="/cours")
app.include_router(cours_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}