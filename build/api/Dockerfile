FROM python:3.11-slim

USER root
WORKDIR /api
EXPOSE 8000

COPY build/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# Création de l'utilisateur (optionnel en production)
ARG USER_NAME=api
ARG USER_ID=1000
ARG GROUP_NAME=api
ARG GROUP_ID=1000

RUN if [ ! -z ${USER_NAME} ] && [ ! -z ${GROUP_NAME} ] && [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ] ; then \
    groupadd -g ${GROUP_ID} ${GROUP_NAME} && \
    useradd -u ${USER_ID} -g ${GROUP_ID} -m ${USER_NAME} && \
    chown -R ${USER_NAME}:${GROUP_NAME} /api \
    ; fi

# Connexion au conteneur en tant qu'utilisateur non-root
USER ${USER_ID:-0}:${GROUP_ID:-0}

CMD ["uvicorn", "src.main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]