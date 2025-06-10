from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import FileResponse
from sqlmodel import Session, select


from src.services.fileService import uploadFile, downloadFile
from src.endpoints.dependencies import get_db

from src.models.documentModel import DocumentRead, DocumentWrite, DocumentBase, Document
from src.models.tpModel import Tp


router = APIRouter(prefix="/documents", tags=["documents"])

@router.post("/uploadfile/{tp_id}", response_model=Document)
async def create_upload_file(file: UploadFile, tp_id: int, description: str = "", db: Session = Depends(get_db)):
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

    # Enregistre le document dans la base de données
    db_document = Document(
        nom=file.filename,
        description=description,
        path=final_path,
        tp_id=tp_id
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)

    return db_document

@router.get("/{document_id}", response_class=FileResponse)
async def get_document(document_id: int, db: Session = Depends(get_db)):
    """
    Récupère un document par son ID.
    """
    document = db.get(Document, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document non trouvé")

    path = downloadFile
    if downloadFile != None:
        return path
    return document.path

@router.post("/{document_id}", response_model=DocumentWrite)
async def post_description_document(document_id: int, description: str, db: Session = Depends(get_db)):
    """
    Met à jour la description d'un document.
    """
    document = db.get(Document, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document non trouvé")

    document.description = description
    db.add(document)
    db.commit()
    db.refresh(document)

    return DocumentWrite.from_orm(document)

@router.delete("/{document_id}")
async def delete_document(document_id: int, db: Session = Depends(get_db)):
    """
    Supprime un document par son ID.
    """
    document = db.get(Document, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document non trouvé")

    db.delete(document)
    db.commit()

    return {"message": "Document supprimé avec succès"}