import os
import shutil

pathBase = "/data"
def uploadFile(file, path):
    """
    Télécharge un fichier sur le serveur.
    """

    finalPath = os.path.join(pathBase, path)
    dirPath = os.path.dirname(finalPath)

    # Vérifie que le chemin existe sinon le crée
    os.makedirs(dirPath, exist_ok=True)

    # Enregistrer le fichier
    with open(finalPath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return finalPath