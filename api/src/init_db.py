#!/usr/bin/env python3
"""
Script d'initialisation simple de la base de données
Ce script crée seulement toutes les tables nécessaires
"""
import asyncio
import sys
from pathlib import Path

# Ajouter le répertoire parent au path pour les imports
sys.path.append(str(Path(__file__).parent.parent))

from sqlmodel import SQLModel
from src.models.models import engine_async
from src.models.userModel import Base as UserBase
from src.models.coursModel import Cours
from src.models.tpModel import Tp
from src.models.documentModel import Document


async def create_all_tables():
    """Crée toutes les tables de la base de données"""
    print("🔧 Création des tables...")

    try:
        # Créer les tables FastAPI Users (utilisateurs)
        async with engine_async.begin() as conn:
            await conn.run_sync(UserBase.metadata.create_all)

        # Créer les tables SQLModel (cours, tp, documents)
        async with engine_async.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)

        print("✅ Tables créées avec succès!")


    except Exception as e:
        print(f"❌ Erreur lors de la création des tables: {e}")
        raise


async def main():
    """Point d'entrée principal du script"""
    print("🚀 Initialisation de la base de données...")
    await create_all_tables()
    print("🎉 Initialisation terminée!")


if __name__ == "__main__":
    asyncio.run(main())
