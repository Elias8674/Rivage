# Dockerfile du backend pour la production
FROM node:20.19-slim AS builder

WORKDIR /app

# Copie et installation des dépendances
COPY app/package*.json ./
COPY app/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copie du code source et build
COPY app/ .
RUN yarn build
