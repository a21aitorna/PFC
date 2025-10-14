# Imagen oficial de Newman (ya incluye CLI y HTML)
FROM postman/newman:latest

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar colecciones y entornos
COPY collections ./collections
COPY environments ./environments

# Crear carpeta para reportes
RUN mkdir -p /app/reports

# Comando por defecto: ejecutar la colección principal y generar HTML
CMD ["run", "collections/api-tests.json", "-e", "environments/local.env.json", "-r", "html", "--reporter-html-export", "reports/results.html"]

# Para lanzarlo manualmente ->  newman run collections/api-tests.json -e environments/local.env.json -r cli
# Para generar reportes html -> newman run collections/api-tests.json -e environments/local.env.json -r html --reporter-html-export reports/results.html