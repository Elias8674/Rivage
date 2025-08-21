import os
from dotenv import load_dotenv

# Charge le bon fichier .env.dev selon l'environnement
env = os.getenv('ENV', 'dev')
load_dotenv(f'.env.{env}')

# Maintenant vos variables sont disponibles
database_url = os.getenv('DATABASE_URL')
#print(f"Using database URL: {database_url}", flush=True)
database_url_async = os.getenv('DATABASE_URL_ASYNC')


if env == "prod":
    storage_cloud = True
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')
else:
    storage_cloud = False
    supabase_url = None
    supabase_key = None
