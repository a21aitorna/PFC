# ------------------------
# BASE IMAGE
# ------------------------
FROM python:3.11-slim

# Instala Node, npm y utilidades
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
WORKDIR /app/backend
COPY app/backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app/backend/ ./

# ------------------------
# FRONTEND
# ------------------------
WORKDIR /app/frontend
# Copia primero package.json y package-lock.json para cache de npm
COPY app/frontend/package.json app/frontend/package-lock.json ./
RUN npm install

# Copia el resto del frontend
COPY app/frontend/ ./
RUN npm run build
RUN npm install -g serve

# ------------------------
# FINAL
# ------------------------
WORKDIR /app
EXPOSE 5000 3000

CMD sh -c "\
    python -m flask run --host=0.0.0.0 --port=5000 & \
    serve -s frontend/build -l 3000"
#