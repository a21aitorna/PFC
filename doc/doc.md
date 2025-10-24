# Proyecto Atenea

- [Introducción](#introducción)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Persistencia de datos](#persistencia-de-datos)
  - [Testing](#testing)
    - [Frontend Testing](#frontend-testing)
    - [Backend Testing](#backend-testing)
- [Estado de arte o análisis del contexto](#estado-de-arte-o-análisis-del-contexto)
  - [Público objetivo](#público-objetivo)
  - [Necesidades que cubre](#necesidades-que-cubre)
  - [Aplicaciones existentes](#aplicaciones-existentes)
- [Propósito](#propósito)
- [Objetivos](#objetivos)
  - [Objetivos principales](#objetivos-principales)
  - [Sistema de Login](#sistema-de-login)
  - [Sistema de biblioteca](#sistema-de-biblioteca)
  - [Sistema de detalle del libro](#sistema-de-detalle-del-libro)
- [Alcance](#alcance)
  - [Funcionalidades implementadas](#funcionalidades-implementadas)
  - [Usuarios de la aplicación](#usuarios-de-la-aplicación)
  - [Contexto](#contexto)
  - [Límites](#límites)
- [TODO: A partir de este punto eres libre de organizar la documentación como estimes pero debes desarrollar el cuerpo de tu proyecto con apartados y subapartados que completen tu documentación](#todo-a-partir-de-este-punto-eres-libre-de-organizar-la-documentación-como-estimes-pero-debes-desarrollar-el-cuerpo-de-tu-proyecto-con-apartados-y-subapartados-que-completen-tu-documentación)
- [Conclusiones](#conclusiones)
- [Referencias, Fuentes consultadas y Recursos externos: Webgrafía](#referencias-fuentes-consultadas-y-recursos-externos-webgrafía)

## Introducción

Proyecto Atenea es una aplicación web orientada a la gestión de bibliotecas personales digitales. Permite a los usuarios almacenar, visualizar, reseñar y compartir libros en distintos formatos (PDF, EPUB). 
Esta se caracteriza por haber sido diseñada y construida mediante el principio de separación por capas, pudieéndose diferenciar cuatro componentes:
- Frontend: interfaz gráfica y lógica de presentación (React)
- Backend: lógica de negocio, controladores y API REST (Flask).
- Persistencia: gestión de datos mediante MySQL y SQLAlchemy.
- Testing: empleo BDD (Cucumber) y Selenium en Java para pruebas automáticas hacia el front y Newman hacia el back.

Todo esto, viene dockerizado, de manera que sea más sencillo si despligue, mantenimiento y escalabilidad. A mayores, se ha habilitado un entorno de Integración Continua y Entrega Continua (CI/CD) basado en Github Actions de manera que se ejecuten las pruebas automáticas cada x tiempo, garantizando la calidad y estabilidad de la aplicación.

### Frontend
Se ha optado por el uso de React, una biblioteca de JavaScript (aunque se puede considerar como framework) muy usada en la actualidad para el desarrollo front. Entre alguna de las características de esta elección está la existencia de un ecosistema que permite integrarse de manera sencilla con el back y con el testing, además de su fácil integración con Docker.
Este componente tendrá esta estructura. 
~~~
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/          # Imágenes, fuentes, íconos, etc.
│   ├── components/      # Componentes reutilizables (Button, Navbar, etc.)
│   ├── pages/           # Páginas o vistas principales (Home, Login, etc.)
│   ├── hooks/           # Custom hooks (useAuth, useFetch, etc.)
│   ├── context/         # Contextos de React (AuthContext, ThemeContext)
│   ├── services/        # Llamadas a APIs o lógica de negocio
│   ├── styles/          # Estilos globales o archivos CSS
│   ├── utils/           # Funciones auxiliares
│   ├── App.js           # Componente raíz
│   └── index.js         # Punto de entrada
├── .env                 
├── .gitignore
├── Dockerfile
├── package-lock.json
└── package.json
~~~
Esta será accesible desde http://localhost:3000

### Backend
Se ha decidido usar Python con el framework Flask, debido a su ligereza y flexibilidad, a parte de que está ya habilitado para proyectos más pequeños.
Además se empleará API REST, la cual será documentada mediante Swagger.
Este componente tendrá esta arquitectura:
~~~
backend/
    ├── dao/                  # Modelos de base de datos con SQLAlchemy 
    ├── dao_schema/           # Schemas de Marshmallow 
    ├── docs/                 # Documentación de la API 
    ├── exceptions/           # Excepciones personalizadas 
    ├── features/             # Lógica específica de cada módulo o funcionalidad
    │   ├── nombre_feature/  
    │   └── controller/       
    ├── static/               # imágenes, CSS..
    ├── utils/                # Funciones auxiliares o helpers reutilizables
    ├── validations/          # Validaciones
    ├── .gitignore            
    ├── Dockerfile            
    ├── main.py               # Punto de entrada de la aplicación Flask
    └── requirements.txt      # Dependencias de Python necesarias 
~~~

### Persistencia de datos
Se usa MySQL, conectado a Flask mediante SQLAlchemy (Object-Relational Mapping u ORM) y PyMySQL como driver.
A contonuación se mostrará el Modelo Entidad Relación (MER) creado para ello.
![Diagrama Entidad-Relación](./img/MER.png)

### Testing
Se diferencian dos partes
#### Frontend Testing
Se centra en la validación del comportamiento y la interacción de la interfaz visual.
Se usan Selenium Java(framework de automatización basada en WebDriver)y Cucumber (se posibilita el uso del denominado Behavior Driven Development, BDD, que permite describir escenarios de prueba mediante un lenguaje natural).
Tendrá la siguiente estructura, empleando el modelo de Page Object Model (POM).
~~~
frontend-testing/
├── src/
│   ├── java/                     
│   │   ├── page/                 # Representan páginas o componentes del frontend
│   │   └── steps/                # Definición de pasos usados en los escenarios de prueba
│   └── resources/                
│       ├── data/                 # Datos que se necesitan (xpath, expresiones regulares...)
│       └── features/             # Archivos .feature escritos en Gherkin (escenarios de prueba para Cucumber)
├── target/                       # Carpeta generada automáticamente por Maven con los resultados de compilación y reportes de pruebas
├── .gitignore                    
└── pom.xml                       # Archivo de configuración de Maven (dependencias, plugins, configuración del proyecto)
~~~
#### Backend Testing
Tiene como propósito validar el correcto funcionamiento de la API REST desarrollada en Flask, asegurando que todas las operaciones CRUD, autenticación, manejo de errores y respuestas JSON se comporten de manera consistente. Se empleará Newman (Postman CLI), permiiendo la ejecución automática de las colecciones de endpoints definidas en Postman, validando códigos de estado, estructuras de respuesta y tiempos de ejecución.
Tendrá la siguiente estructura
~~~
backend-testing/
├── collections/                  # Carpeta con las colecciones de pruebas de API 
├── environments/                 # Configuraciones de entorno para las pruebas (URLs, tokens, variables)
├── package-lock.json             # Archivo generado automáticamente por npm
└── package.json                  # Archivo de configuración del proyecto Node.js (dependencias, scripts de test, metadata)
~~~

## Estado de arte o análisis del contexto

### Público objetivo
- Usuarios amantes de la lectura que quieren tener organizada su colección de libros.
- Lectores ocasionales que buscan una lectura relacionada con un tema concreto.
- Clubes de lectura.
- Centros educativos.

### Necesidades que cubre
- Organización y visualización de libros digitales en una estantería virtual.
- Visitar bibliotecas de otros usuarios y descubrir nuevas lecturas, así como ayudar a futuros lectores con reseñas de ese libro.

### Aplicaciones existentes
- Calibre: tiene una función semejante, pero es una aplicación de escritorio, al contrario que Proyecto Atenea.
- Internet archive: está creada con una función más de archivado que social.



## Propósito

Este proyecto consiste en una librería virtual. En ella cada usuario, tendrá una biblioteca propia donde podrán subir sulibros en formato PDF y EPUB, así como acceder a las biliotecas de otros usuarios y realizar acciones como escribir reseñas sobre ellos, añadirlos a su propia biblioteca o descargarlos.

El sistema contará con un administrador, que tendrá el control total. Este podrá eliminar reseñas o libros, así como bloquear o dar de baja usuarios, especialmente en casos de incumplimiento de normas (por ejemplo, lenguaje ofensivo en reseñas o subida de libros sujetos a copyright).

Así mismo, una parte esencial de este proyecto es el después de crear una funcionalidad: ¿esta está funcionando bien? ¿Cumple todos los requisitos? ¿Cómo se que a posteriori no se va a romper? La respuesta a ello es el testing. Para ello, haré tests automáticos,tanto a nivel frontend como backend, junto un flujo de integración y despliegue continui (CI/CD). De este modo, cada actualización del repositorio se validará automáticamente, asegurando que las funcionalidades existentes no se rompan y su estabilidad.

## Objetivos

### Objetivos principales
- [ ] Creación de Diagrama Entidad Relación de la base de datos.
- [ ] Definición de todas las funcionalidades del proyecto.
- [ ] Construcción de los contenedores docker para Backend, Frontend, Base de datos y Testing.
- [ ] Construcción del sistema de integración CI/CD.
- [ ] Configuración del docker-compose para la aplicación entera.
- [ ] Implementación del sistema de login (Backend).
- [ ] Implementación del sistema de login (Frontend).
- [ ] Implementación de tests para el sistema de login.
- [ ] Implementación del sistema de biblioteca (Backend)
- [ ] Implementación del sistema de biblioteca (Frontend)
- [ ] Implementación de tests para el sistema de biblioteca.
- [ ] Implementación del sistema de detalle de un libro (Backend)
- [ ] Implementación del sistema de detalle de un libro (Frontend)
- [ ] Implementación del sistema de detalle de un libro (Backend)
- [ ] Implementación de test para el sistema de detalle de un libro
- [ ] Levantar la aplicación desarrollada sin errores.
- [ ] Generación de informe de pruebas correctas y falladas.

### Sistema de Login
> Cuando tenga definida todas las funcionalidades de este sistema las pondré como objetivo.

### Sistema de biblioteca
> Cuando tenga definida todas las funcionalidades de este sistema las pondré como objetivo.

### Sistema de detalle del libro
> Cuando tenga definida todas las funcionalidades de este sistema las pondré como objetivo.

## Alcance

### Funcionalidades implementadas
- Registro, login y recuperación de contraseña a través de una pregunta de seguridad.
- Gestión de usuarios en función del rol.
- Subida de libros con formato PDP/EPUB.
- Extracción de metadatos de los libros.
- Organización de libros con una representación visual semejante a una librería.
- Búsqueda de otros usuarios y bibliotecas.
- Filtrado y búsqueda de libros dentro de una biblioteca.
- Visualización del detalle de un libro.
- Visualización, creación, edición y eliminación de reseñas.
- Acciones de administrador (bloqueo y eliminación de usuarios, eliminación de cualquier libro y reseña).
- Implementación de pruebas automatizadas de frontend con Selenium (Java+Cucumber).
- Implementación de pruebas automatizada de backend con Newman Postman.
- Integración con Github Actions (Jenkinks si no se permite subir a Github el proyecto).
- Dockerización de toda la aplicación y despliegue a través de un docker-compose.

### Usuarios de la aplicación
- La aplicación podrá ser usada por cualquier persona a partir de 14 años (a la hora de registrarse, se implementatará un método de verificación a través de la fecha de nacimiento).
- Tendrá sólo un administrador de momento.
- No habrá perfiles de invitado, será necesario registrarse.

### Contexto
- Se trata de un proyecto académico, sin previsiones de que salga a producción, con el objetivo de dar a conocer más el perfil de tester.
- Todos los usuarios serán totalmente ficticios.

### Límites
- **Recuperación de la contraseña**: lo adecuado sería que la recuperación de la contraseña fuera a través de un enlace con un correo electrónico. Por falta de tiempo, se lleva de una forma más sencilla, totalmente factible, pero que a nivel profesional, no sería lo más adecuado, tanto por vulnerabilidad como por profesionalidad.
- **Pruebas de rendimiento**: por posible falta de tiempo, no se abarcarán estas pruebas que servirían para evitar que la aplicación vaya lenta o no funcione ante una alta demanda de usuarios al mismo tiempo, así como serviría para saber qué requisitos son necesarios a la hora de alojarlos en un servidor en caso de que fuera a producción.
- **Pruebas unitarias**: por falta de tiempo, no se abordarán estas pruebas. Así mismo, estas son hechas más por desarrolladores, y lo que quiero mostrar es más el rol de tester.
- **Edición de medatos del libro**: esto en función del tiempo, podrá ser incorporado.
- **Aplicación responsive**: la aplicación sólo se mostrará para web de escritorio  por falta de tiempo.

## TODO: A partir de este punto eres libre de organizar la documentación como estimes pero debes desarrollar el cuerpo de tu proyecto con apartados y subapartados que completen tu documentación

> Hemos elaborado un [checklist](checklist.md) de puntos necesarios para tu PFC, para que revises estas recomendaciones/especificaciones.
> Apóyate en tu tutor/a si tienes duda de cómo organizar tu proyecto y estos apartados/subapartado. Cada proyecto y su contexto determinará la mejor forma de estructurarlo. Piensa bien cómo lo vas a hacer.

## Conclusiones

> Deja esta apartado para el final. Realiza un resumen de todo lo que ha supuesto la realización de tu proyecto. Debe ser una redacción breve. Un resumen de los hitos conseguidos más importantes y de lo aprendido durante el proceso.
> Puede ser un buen punto de partida para organizar tu presentación y ajustarla al tiempo que tienes.

## Referencias, Fuentes consultadas y Recursos externos: Webgrafía

> *TODO*: Enlaces externos y descipciones de estos enlaces que creas conveniente indicar aquí. Generalmente ya van a estar integrados con tu documentación, pero si requieres realizar un listado de ellos, este es el lugar.
