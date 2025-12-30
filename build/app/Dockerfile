FROM node:20.19
USER root
WORKDIR /app
EXPOSE 5173

# Copier les fichiers de dépendances d'abord (optimisation du cache)
COPY app/package.json app/yarn.lock* ./

# Installer les dépendances
RUN yarn install

# Copier le reste du code source
COPY app/ .

# Gestion de l'utilisateur (votre code existant)
ARG USER_NAME
ARG USER_ID
ARG GROUP_NAME
ARG GROUP_ID

RUN groupmod -g 1001 node \
  && usermod -u 1001 -g 1001 node

RUN if [ ! -z ${USER_NAME} ] && [ ! -z ${GROUP_NAME} ] && [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ] ; then \
    useradd -G www-data,root -u $USER_ID -d /home/$USER_NAME $USER_NAME && \
    mkdir -p /home/$USER_NAME/.cache/yarn && \
    chown -R ${USER_NAME}:${GROUP_NAME} /home/$USER_NAME /app \
    ; fi

USER ${USER_ID:-0}:${GROUP_ID:-0}

CMD [ "yarn", "dev" ]