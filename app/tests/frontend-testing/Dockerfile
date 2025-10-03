# Imagen base con Maven y JDK 17
FROM maven:3.9.2-eclipse-temurin-17

# Carpeta de trabajo
WORKDIR /app

# Copiar pom.xml y descargar dependencias (cacheable)
COPY pom.xml .
RUN mvn dependency:resolve

# Copiar el código de tests
COPY . .

# Exponer puerto si necesitas reportes
EXPOSE 8080

# Comando por defecto: ejecutar tests
CMD ["mvn", "test"]
