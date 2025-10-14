# Imagen base con Maven y JDK 17
FROM maven:3.9.2-eclipse-temurin-17

# Carpeta de trabajo
WORKDIR /app

# Copiar pom.xml y descargar dependencias (cacheable)
COPY pom.xml ./
RUN mvn dependency:resolve

# Copiar el código de tests
COPY . .

# Exponer puerto para reportes
EXPOSE 8080

# Ejecutar tests y servir reportes HTML
CMD mvn clean integration-test && \
    if [ -d target/cucumber-html-reports ]; then \
        echo "Abriendo servidor para reporte HTML..."; \
        cd target/cucumber-html-reports && python3 -m http.server 8080; \
    else \
        echo "No se encontraron reportes HTML"; \
        exit 1; \
    fi
