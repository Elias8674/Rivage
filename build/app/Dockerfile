FROM node:20.19
USER root
WORKDIR /app
EXPOSE 5173

# Arguments définis dans compose.yml
ARG USER_NAME
ARG USER_ID
ARG GROUP_NAME
ARG GROUP_ID

RUN groupmod -g 1001 node \
  && usermod -u 1001 -g 1001 node

# Crée un utilisateur système pour exécuter les commandes npm/yarn
RUN if [ ! -z ${USER_NAME} ] && [ ! -z ${GROUP_NAME} ] && [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ] ; then \
    useradd -G www-data,root -u $USER_ID -d /home/$USER_NAME $USER_NAME && \
    mkdir -p /home/$USER_NAME/.cache/yarn && \
    chown -R ${USER_NAME}:${GROUP_NAME} /home/$USER_NAME /app /app/node_modules \
    ; fi

# Connexion au conteneur en tant qu'utilisateur non-root
USER ${USER_ID:-0}:${GROUP_ID:-0}

CMD [ "yarn", "dev" ]