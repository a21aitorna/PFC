FROM python:3.11-slim

# Instala Node y utilidades
RUN apt-get update && apt-get install -y curl gnupg build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ------------------------
# BACKEND
# ------------------------
COPY app/backend/requirements.txt backend/
RUN pip install --no-cache-dir -r backend/requirements.txt
COPY app/backend/ backend/

ENV FLASK_APP=main
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000
ENV FLASK_ENV_CONFIG=production
ENV MYSQL_HOST=localhost
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV DATABASE_NAME=AteneaProject
ENV JWT_SECRET_KEY=supersecret
ENV API_BASE_URL=http://localhost:5000/api

# ------------------------
# FRONTEND
# ------------------------
COPY app/frontend/package*.json frontend/
WORKDIR /frontend
RUN npm install
COPY app/frontend/ ./
RUN npm run build
RUN npm install -g serve

# ------------------------
# Final
# ------------------------
WORKDIR /app
EXPOSE 5000 3000

CMD sh -c "\
    python -m flask run --host=0.0.0.0 --port=5000 & \
    serve -s frontend/build -l 3000"
