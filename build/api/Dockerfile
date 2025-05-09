FROM python:3.11-slim

USER root
WORKDIR /api
EXPOSE 8000
COPY build/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
#ENV PYTHONPATH="${PYTHONPATH}:/api"

# Crée un utilisateur système pour exécuter les commandes npm/yarn
RUN if [ ! -z ${USER_NAME} ] && [ ! -z ${GROUP_NAME} ] && [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ] ; then \
    useradd -G www-data,root -u $USER_ID -d /home/$USER_NAME $USER_NAME && \
    mkdir -p /home/$USER_NAME/.cache/yarn && \
    chown -R ${USER_NAME}:${GROUP_NAME} /home/$USER_NAME /app /app/node_modules \
    ; fi

# Connexion au conteneur en tant qu'utilisateur non-root
USER ${USER_ID:-0}:${GROUP_ID:-0}

CMD ["uvicorn", "src.main:api", "--host", "0.0.0.0", "--port", "8000"]