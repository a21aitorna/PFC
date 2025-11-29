# ------------------------
# BASE IMAGE
# ------------------------
FROM python:3.11-slim

# Instala Node y utilidades
RUN apt-get update && apt-get install -y \
        curl \
        gnupg \
        build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


# ------------------------
# BACKEND
# ------------------------
WORKDIR /app

# Copiar backend
COPY app/backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt
COPY app/backend ./backend

# Variables internas del backend
ENV FLASK_APP=main
ENV FLASK_RUN_HOST=0.0.0.0

# Railway asigna un puerto dinámico: $PORT
ENV FLASK_RUN_PORT=$PORT

# ------------------------
# FRONTEND (React)
# ------------------------
WORKDIR /app/frontend

# Copia package.json para cache
COPY app/frontend/package.json app/frontend/package-lock.json ./
RUN npm install

# Copia el resto del frontend
COPY app/frontend ./

# Variable visible por React (IMPORTANTE)
# Railway la sobrescribirá en producción
ENV REACT_APP_API_BASE_URL=""

# Compila React
RUN npm run build


# ------------------------
# Copiar build del frontend al backend
# ------------------------
WORKDIR /app
RUN mkdir -p backend/static
RUN cp -r frontend/build/* backend/static/


# ------------------------
# FINAL: ejecutar SOLO Flask
# ------------------------
WORKDIR /app/backend

EXPOSE 5000

CMD ["sh", "-c", "flask run --host=0.0.0.0 --port=$PORT"]
