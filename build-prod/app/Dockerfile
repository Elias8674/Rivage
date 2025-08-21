# Alternative sans Nginx - utilise un serveur Node.js simple
FROM node:20-alpine as build

WORKDIR /app
COPY app/package.json app/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY app/ .
RUN yarn build

# Stage de production avec serveur Node simple
FROM node:20-alpine

WORKDIR /app

# Installation d'un serveur statique simple
RUN npm install -g serve

# Copie des fichiers buildés
COPY --from=build /app/dist .

# Utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000

# Serveur statique avec support SPA
CMD ["serve", "-s", ".", "-l", "3000"]
