# Imagen Newman basada en Debian Slim para más compatibilidad
FROM postman/newman:latest

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar colecciones y entornos
COPY collections ./collections
COPY environments ./environments

# Crear carpeta para reportes
RUN mkdir -p /app/reports

# Comando por defecto: ejecutar la colección
# CMD ["run", "collections/nombre-coleccion.json", "-e", "environments/local.env.json", "-r", "cli,junit,html", "--reporter-junit-export", "reports/results.xml", "--reporter-html-export", "reports/results.html"]
# newman run collections/api-tests.json -> ejecutar colecciones de json
# -e environments/local.env.json -> indica el entorno
# -r cli,junit,html -> se muestra salida por consola y genera xml y gtml
# --reporter-junit-export reports/results.xml -> donde se guarda el xml
# --reporter-html-export reports/results.html -> donde se guarda el html