# Proyecto Atenea
Proyecto Atenea, es un proyecto que realizo como PFC del Grado Superior de Desarrollo de Apliciones Web, en la que se combina tanto un perfil tanto fullstack como QA, cuya idea surgió de mi pasión por la lectura así como a la hora de intentar visibilizar el perfil de tester, un aspecto que no se vio mucho durante el ciclo, y que considero que tiene tanta importancia como el desarrollo propio.

## Descripción
Proyecto Atenea es una aplicación web que permite a cada usuario crear y gestionar su propia biblioteca digital personal.
El proyecto busca ofrecer un espacio en el que los usuarios puedan tener sus propias bibliotecas y subir libros en formato PDF o EPUB, así como acceder a las bibliotecas de otros usuarios y compartir reseñas y valoraciones. De esta manera, se busca un fomento de la lectura, así como el descubrimiento y adquisición de nuevos libros.

Contará con un administrador, el cual a través de un panel, podrá gestionar usuarios, eliminar libros o reseñas inadecuadas y bloquear cuentas en caso de incumplimiento de normas.

El sistema está desarrollado en un entorno full-stack: cuenta con autenticación segura, un entorno completamente dockerizado y una integración continua (CI/CD) que garantiza el correcto funcionamiento de todas sus partes mediante pruebas automáticas.

## Instalación / Puesta en marcha
El proyecto está preparado para ser ejecutado mediante Docker, de manera que se inicien todos los servicios (backend, frontend y base de datos) a través de un sólo comando. A mayores, con la integración continua, se podrán ver los reportes de los tests automáticos, pero a efectos de demo, estos se podrán lanzar manualmente con comandos.

1. **Clonar el repositorio:**
    ~~~
    git clone https://github.com/a21aitorna/FCT.git
    cd app
    ~~~
2. **Construir e iniciar los contenedores::**
    ~~~
    docker-compose up --build
    ~~~
3. **Una vez iniciado, acceder a:**
    ~~~
    - Frontend: http://localhost:3000
    - Backend (API/Swagger): http://localhost:5000
    ~~~
4. **Comandos tests**
    ~~~
    cd app/tests
    > Los tengo que retocar aún
    ~~~
## Uso

> *TODO*: Es este apartado describe brevemente cómo se usará este software. Plantea un uso básico (como un *quickstart*) Si tiene una interfaz de terminal, puedes describir aquí su sintaxis. Si tiene una interfaz gráfica de usuario, describe aquí **sólo el uso** (a modo de sumario) **de los aspectos más relevantes de su funcionamiento** (máxima brevedad, como si fuese un anuncio reclamo o comercial).
> Podrías incluso hacer una pequeña demo en *gif* o un pantallazo de la misma muy descriptivo. Recueda que esto es un reclamo para que la prueben o lean tu documentación más extensa.

## Sobre el autor

> *TODO*: Realiza una breve descripción de quien eres (perfil profesional), tus puntos fuertes, o tecnologías que más dominas... y porqué te has decantado por este proyecto. **No más de 200 palabras**. Indica la forma fiable de contactar contigo en el presente y en el futuro.

## Licencia

> *TODO*: Brevísimamente. Indica qué licencia usarás y crea un link a ella. Hay miles de ejemplos en Github.
> *TODO*: Es requisito INDISPENSABLE el licenciar explícitamente el proyecto software. Se recomienda licenciar con *MIT License* (como viene en la plantilla) o *GNU Free Documentation License Version 1.3*. Presencia de un fichero `LICENSE` en la raiz del repo, con tu fichero de licencia. Recuerda que si empleas una licencia de software libre estás autorizando la derivación de tu obra bajo la misma licencia que elijas, pudiendo dar continuidad, p. e. otro alumno, para continuar tu proyecto en otro curso.
> Si tu proyecto tiene además otro tipo contenido documental, recomendamos los términos de *GNU Free Documentation License Version 1.3*, crea igualmente el fichero `LICENSE`. Será especialmente valorado en este caso, la claridad de la especificación para que el proyecto pueda ser ejecutado partiendo de lo proyectado.
> Ten en cuenta que estás cediendo el uso de este software y sus subproductos generados a la comunidad.

## Documentación

> *TODO*: Emplaza a quien se haya interesado en tu proyecto a leer una guía o documentación extendida del mismo. Haz un link a ella en este punto.

Este proyecto dispone de [una documentación más extensa](doc/doc.md) del proyecto que recomiendo revisar.

## Guía de contribución

> *TODO*: Tratándose de un proyecto de software libre, es muy importante que expongas cómo se puede contribuir con tu proyecto. Algunos ejemplos de esto son realizar nuevas funcionalidades, corrección y/u optimización del código, realización de tests automatizados, nuevas interfaces de integración, desarrollo de plugins, etc. etc. Sé lo más conciso que puedas.
