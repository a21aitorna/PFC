# Proyecto Atenea
Proyecto Atenea, es un proyecto que realizo como PFC del Grado Superior de Desarrollo de Apliciones Web, en la que se combina un perfil tanto fullstack como QA, cuya idea surgió de mi pasión por la lectura así como a la hora de intentar visibilizar el perfil de tester, un aspecto que no se vio mucho durante el ciclo, y que considero que tiene tanta importancia como el desarrollo propio.

## Descripción
Proyecto Atenea es una aplicación web que permite a cada usuario crear y gestionar su propia biblioteca digital personal.
El proyecto busca ofrecer un espacio en el que los usuarios puedan tener sus propias bibliotecas y subir libros en formato PDF o EPUB, así como acceder a las bibliotecas de otros usuarios y compartir reseñas y valoraciones. De esta manera, se busca un fomento de la lectura, así como el descubrimiento y adquisición de nuevos libros.

Contará con un administrador, el cual a través de un panel, podrá gestionar usuarios, eliminar libros o reseñas inadecuadas y bloquear cuentas en caso de incumplimiento de normas.

El sistema está desarrollado en un entorno full-stack: cuenta con autenticación segura, un entorno completamente dockerizado y una integración continua (CI/CD) que garantiza el correcto funcionamiento de todas sus partes mediante pruebas automáticas.

## Instalación / Puesta en marcha
El proyecto está preparado para ser ejecutado mediante Docker, de manera que se inicien todos los servicios (backend, frontend y base de datos) a través de un sólo comando. A mayores, con la integración continua, se podrán ver los reportes de los tests automáticos, pero a efectos de demo, el backend se puede lanzar mediante un comando. Para los tests de frontend, lo mejor es usar el IDE de IntelliJ.
 - 

1. **Configurar los archivos .env**
    ~~~
    - Backend -> crear archivo .env semejante al -envSample en app\backend\envs\dev.
    - Frontend -> crear archivo .env semjante al -envSample en app\frontend\envs\dev. Se tiene que añadir la dirección del back junto /api.
    ~~~
2. **Clonar el repositorio:**
    ~~~
    git clone https://github.com/a21aitorna/FCT.git
    cd app
    ~~~
3. **Construir e iniciar los contenedores:**
    ~~~
    docker-compose up --build (se recomienda si se usa VSCode utilizar el plugin)
    ~~~
4. **Una vez iniciado, acceder a:**
    ~~~
    - Frontend: http://localhost:3000
    - Backend (API/Swagger): http://localhost:5000
    ~~~
5. **Comandos tests (para frontend leer esta [documentación](app/tests/frontend-testing/READ.md))**
    ~~~
    - Backend testing
        - cd app/tests/backend-testing
        - node run-all-tests.js
    - Frontend Testing
        - Se especifica en la documentaciópn propia de la carpeta
    ~~~
    
## Uso

Este software funciona como una biblioteca digital. Tras iniciar sesión, el usuario accederá a su propia librería; si el nombre de usuario no existe o la contraseña es incorrecta, será redirigido al formulario de registro.

Dentro de su biblioteca, el usuario podrá añadir libros y visualizar su portada, título, autor, puntuación y fecha de subida. También tendrá la opción de descargarlos en su dispositivo físico o eliminarlos. Al hacer clic sobre cualquiera de ellos, podrá acceder a su información detallada, leer el libro, escribir reseñas y eliminarlas siempre que tenga la autorización correspondiente (ser su autor o administrador).

Además, el usuario podrá explorar las bibliotecas de otros usuarios, pudiendo realizar las acciones previamente descritas (excepto la eliminación de libros).

## Sobre el autor

Soy Aitor, QA con experiencia en testing manual y en la automatización de pruebas utilizando Selenium y Cucumber, asegurando siempre la calidad del producto entregado. Actualmente estoy ampliando mis conocimientos en automatización estudiando por mi cuenta Cypress y Playwright, dos frameworks muy utilizados en la industria.
También me interesa profundizar en otros ámbitos del testing, como las pruebas automatizadas de backend, las pruebas de rendimiento y la creación de pipelines de CI/CD orientados al testing mediante herramientas como Jenkins y GitHub Actions.
Si deseas ponerte en contacto conmigo, puedes escribirme a aitornalonso@gmail.com; responderé lo antes posible.
¡Un saludo!

## Licencia

Este proyecto está bajo una **licencia propietaria de solo lectura**.  
Se permite **clonar, descargar y ejecutar** el proyecto localmente con fines de aprendizaje o prueba.  
Queda **prohibido modificar, redistribuir, usar con fines comerciales o crear obras derivadas** sin autorización expresa y por escrito del autor.  

Consulta los términos completos en [`LICENSE`](./LICENSE).

## Documentación

Este proyecto dispone de [una documentación más extensa](doc/doc.md) del proyecto.

## Guía de contribución

Salvo autorización expresa del autor, este proyecto no tendrá modificaciones por parte de terceros.

