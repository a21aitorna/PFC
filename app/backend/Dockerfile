FROM python:3.11-slim

WORKDIR /app

# Copia y instala dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código del backend
COPY . .

# Variables de entorno defaults (pueden sobrescribirse en Railway)
ENV FLASK_APP=main
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000
ENV MYSQL_HOST=db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV DATABASE_NAME=AteneaProject

EXPOSE 5000

# Comando para iniciar Flask
CMD ["python", "-m", "flask", "run"]
