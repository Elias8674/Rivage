import os

# Récupération directe des variables d'environnement depuis docker-compose
env = os.getenv('ENV', 'dev')

# Variables de base de données définies dans docker-compose
database_url = os.getenv('DATABASE_URL')
database_url_async = os.getenv('DATABASE_URL_ASYNC')

if env == "prod":
    storage_cloud = True
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')
else:
    storage_cloud = False
    supabase_url = None
    supabase_key = None
