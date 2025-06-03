import os
import shutil
from src.config import storage_cloud, supabase_url, supabase_key

from supabase import create_client, Client

class LocalStorage:
    """
    Classe pour gérer le stockage local des fichiers.
    """

    def __init__(self, base_path="/data"):
        self.base_path = base_path

    def save_file(self, file, path):
        """
        Enregistre un fichier dans le stockage local.
        """
        final_path = os.path.join(self.base_path, path)
        dir_path = os.path.dirname(final_path)

        # Vérifie que le chemin existe sinon le crée
        os.makedirs(dir_path, exist_ok=True)

        # Enregistrer le fichier
        with open(final_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return final_path


class SupabaseStorage:
    """
    Classe pour gérer le stockage dans Supabase.
    """
    def __init__(self):
        self.client: Client = create_client(supabase_url, supabase_key)
        self.bucket_name = "lycee"

    def save_file(self, file, path):
        """
        Enregistre un fichier dans Supabase.
        """
        try:
            # Lire le contenu du fichier
            file.file.seek(0)  # Retour au début du fichier
            file_content = file.file.read()

            # Upload vers Supabase Storage
            result = self.client.storage.from_(self.bucket_name).upload(
                path,
                file_content,
                file_options={
                    "content-type": file.content_type or "application/octet-stream"
                }
            )

            # Vérifier si l'upload a réussi
            if hasattr(result, 'error') and result.error:
                raise Exception(f"Erreur lors de l'upload: {result.error}")

            # Retourner l'URL publique du fichier
            public_url = self.client.storage.from_(self.bucket_name).get_public_url(path)
            return public_url

        except Exception as e:
            raise Exception(f"Impossible de sauvegarder le fichier: {str(e)}")

    def download_file(self, path):
        """
        Télécharge un fichier depuis Supabase.
        """
        try:
            # Télécharger le fichier
            result = self.client.storage.from_(self.bucket_name).download(path)

            # Vérifier si le téléchargement a réussi
            if hasattr(result, 'error') and result.error:
                raise Exception(f"Erreur lors du téléchargement: {result.error}")

            return result

        except Exception as e:
            raise Exception(f"Impossible de télécharger le fichier: {str(e)}")


localStorage = LocalStorage()
supabaseStorage = SupabaseStorage()

def uploadFile(file, path):
    """
    Télécharge un fichier sur le serveur.
    """
    if storage_cloud:
        finalPath = supabaseStorage.save_file(file, path)
    else:
        # Utilise le stockage local
        finalPath = localStorage.save_file(file, path)

    return finalPath

def downloadFile(path):
    """
    Télécharge un fichier depuis le serveur.
    """
    if storage_cloud:
        finalPath = supabaseStorage.download_file(path)

    else:
        return None
    return finalPath