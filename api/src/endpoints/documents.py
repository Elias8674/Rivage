from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlmodel import Session, select


from src.services.fileService import uploadFile
from src.endpoints.dependencies import get_db
from src.models.models import Tp


router = APIRouter(prefix="/documents", tags=["documents"])

@router.post("/uploadfile/{tp_id}")
async def create_upload_file(file: UploadFile, tp_id: int, db: Session = Depends(get_db)):
    """
    Télécharge un fichier sur le serveur.
    """
    if not file:
        raise HTTPException(status_code=400, detail="Aucun fichier fourni")

    # Récupère l'ID du cours associé au TP
    db_tp = db.get(Tp, tp_id)
    if not db_tp:
        raise HTTPException(status_code=404, detail="TP non trouvé")

    path = f"{db_tp.cours_id}/{tp_id}/{file.filename}"

    final_path = uploadFile(file, path)

    return {"filename": file.filename, "path": final_path}

