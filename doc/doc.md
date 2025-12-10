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
		- [1.Login](#1login)
		- [2.Registro](#2registro)
		- [3.Recuperar contraseña](#3recuperar-contraseña)
			- [Formulario1 recuperación de contraseña](#formulario1-recuperación-de-contraseña)
			- [Formulario2 recuperación de contraseña](#formulario2-recuperación-de-contraseña)
	- [Sistema de biblioteca](#sistema-de-biblioteca)
		- [1. Buscar otras librerías](#1-buscar-otras-librerías)
		- [2. Buscar libros](#2-buscar-libros)
		- [3. Ordenar libros](#3-ordenar-libros)
		- [4. Subir libros](#4-subir-libros)
		- [5. Biblioteca](#5-biblioteca)
	- [Sistema de detalle del libro](#sistema-de-detalle-del-libro)
		- [1. Detalle](#1-detalle)
		- [2. Contador de reseñas](#2-contador-de-reseñas)
		- [3. Formulario de reseña](#3-formulario-de-reseña)
		- [4. Visualización de reseñas](#4-visualización-de-reseñas)
		- [5. Botón de volver a la librería](#5-botón-de-volver-a-la-librería)
	- [Sistema de admin](#sistema-de-admin)
- [Alcance](#alcance)
	- [Funcionalidades implementadas](#funcionalidades-implementadas)
	- [Usuarios de la aplicación](#usuarios-de-la-aplicación)
	- [Contexto](#contexto)
	- [Límites](#límites)
	- [Planificación](#planificación)
	- [Gastos](#gastos)
	- [Normativa](#normativa)
	- [Ideas de implementación para el futuro](#ideas-de-implementación-para-el-futuro)
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

Todo esto, viene dockerizado, de manera que sea más sencillo su despligue, mantenimiento y escalabilidad.

Actualmente, la aplicación se encuentra desplegada, pudiendo acceder mediante esta [URL](https://pfcfront-production-a352.up.railway.app/login). Así mismo, accediendo [aquí](https://pfcback-production.up.railway.app/apidocs/). 
Para garantizar el correcto funcinamiento de esta, se ha establecido un pipeline de GithubActions, el cual se ejecuta una vez al día a las 6:00. Esto genera unos informes que hay que revisar diariamente, que se pueden observar [aquí](https://a21aitorna.github.io/PFC_TESTS/). 

### Frontend
Se ha optado por el uso de React, una biblioteca de JavaScript (aunque se puede considerar como framework) muy usada en la actualidad para el desarrollo front. Entre alguna de las características de esta elección está la existencia de un ecosistema que permite integrarse de manera sencilla con el back y con el testing, además de su fácil integración con Docker. Otra clave decisiva, fue la fácil creación de componentes, los cuales serán usado a la hora de la construcción de las páginas, pudiendo hacer cambios menos invasivos y no usando tanto código.
A la hora de estilos, se ha optado por tailwind.css, un framework CSS que se caracteriza por permitir una mayor personalización gracias a sus denominadas Utility Classes, clases específicas paqra cada cosa.
Este componente tendrá esta estructura. 
~~~

frontend
├── envs
├── node_modules
├── public
|	└── index.html
├── src
│   ├── assets				# Carpeta que tendrá las correspondiente para imágenes, traducciones, fuentes...
│   │   ├── fontStyle		# Carpeta con las fuentes externas que se han añadido
│   │   ├── i18n			# Carpeta que contiene las traducciones
│   │   └── images
│   ├── components			# Carpeta donde se encuentran los componentes reutilizables (Backgroun, Card...)
│   ├── config				# Carpeta de configuración (se establece cuál URL se usa exactamente del back)
│   ├── context				# Carpeta de contextos de React (en este caso sólo userProvider)
│   ├── hooks				# Carpeta donde creo los custom hoooks para cada page (es prácticamente la lógica)
│   ├── pages				# Carpeta donde almaceno las vistas principales
│   ├── styles				# Carpeta donde está el archivo global de CSS
│   │   └── global.css
│   ├── App.js				# Componente raíz
│   └── index.js	
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json			# Dependencias necesarias
├── postcss.config.js
└── tailwind.config.js
~~~
Esta será accesible desde http://localhost:3000

### Backend
Se ha decidido usar Python con el framework Flask, debido a su ligereza y flexibilidad, a parte de que está ya habilitado para proyectos más pequeños.
Además se empleará API REST, la cual será documentada mediante Swagger (en local se podrá acceder a través de http://localhost:5000/apidocs/).
Este componente tendrá esta arquitectura:
~~~
backend-project
├── dao						# Modelos de base de datos con SQLAlchemy 
├── database				# Configuración e inicialización de la base de datos
├── docs					# Carpeta con la documentación en swagger con formato .yml para cada endpoint
├── envs
├── exceptions				# Carpeta donde configuro respuestas http, con mensajes y códigos personalizados para mayor facilidad y entendimiento.
│   ├── __init__.py
│   └── http_status.py
├── features				# Lógica específica de cada módulo o funcionalidad
|	└── nombre_feature  		# Nombre de la feature
|     	├── controller  			# Aquí se define la lógica y se hacen llamadas a funciones de repo
|		└── route					# Aquí se crean las rutas y de qué tipo son, a la vez que se enlaza con el documento swagger
├── repo					# Aquí se crean mediante SQLAlchemy, consultas.
├── tasks					# Carpeta donde establezco una series de funciones las cuales se ejecutan automáticamente cada vez que se despliega el back.
├── uploads					# Carpeta donde se almacenan los libros (portadas y archivos)
├── utils					# Funciones que se usan a lo largo del proyecto
├── validations				# Funciones que sirven para validar ciertos casos
├── .gitignore
├── Dockerfile
├── main.py					# Punto de entrada
├── requirements.txt		# Dependencias de python necesarias
├── seed.py					# Funciones que se ejutan cada vez que se inicia el servicio de back (están relacionadas con creación de elementos para la base de datos)
└── seed_testing.py			# Lo mismo que la anterior, pero para elementos que se usan a la hora del testing.
~~~
Esta será accesible desde http://localhost:5000

### Persistencia de datos
Se usa MySQL, conectado a Flask mediante SQLAlchemy (Object-Relational Mapping u ORM) y PyMySQL como driver.
A continuación se mostrará el Modelo Entidad Relación (MER) creado para ello.
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
Se podrán diferencias tres elementos esenciales:

#### 1.Login
El usuario introducirá su nombre de usuario y contraseña, y si existe se logeará. Si no existe, se llevará a un registro. También estará la posibilidad de recuperar la contraseña.
Todos los campos serán obligatorios.
![Login](img/BorradoresFront/Login/1.Login.png)	

#### 2.Registro
El usuario para registrarse tendrá que rellenar un formulario en que se pidan los siguientes datos:
- Nombre (50 caracteres máximo)
- Apellidos (60 caracteres máximo)
- Nombre de usuario (30 caracteres máximo)
- Fecha nacimiento
- Nombre biblioteca (100 caracteres máximo)
- Contraseña (100 caracteres máximo)
- Contraseña repetida (debe coincidir)
- Pregunta seguridad (200 caracteres máximo)
- Respuesta (100 caracteres máximo)
- Botón "Registrarse"

Se verificarán las siguientes acciones:
- Todos los campos son obligatorios, en caso de campo vacío mostrar un mensaje de campo obligatorio.
- El nombre del usuario deber ser único.
- La contraseña debe tener como mínimo 8 caracteres, 1 mayúscula, 1 número y un símbolo.
- La contraseña repetida debe coincidir con la primera.
- La contraseña se tiene que proteger con un Hash previo a su almacenamiento.
- La respuesta se tiene que proteger con un Hash previo a su almacenamiento.
- El usuario debe tener 14 años como mínimo (se calculará a partide la fecha de nacimiento).
![Registro](img/BorradoresFront/Login/2.Registrarse.png)

#### 3.Recuperar contraseña
Tendrá dos formularios.
##### Formulario1 recuperación de contraseña
En este formulario se verificará que el usuario existe; si no existe o se deja vacío, se mostrará un error.
![Formulario1RecuperarContraseña](img/BorradoresFront/Login/3.1RecuperarContraseña.png)

##### Formulario2 recuperación de contraseña
Se introducirá la pregunta de seguridad y su respuesta, junto la nueva contraseña, la cual hay que escribir dos veces.
Se verificará que:
- La respuesta coincida con la introducida.
- La contraseña debe tener como mínimo 8 caracteres, 1 mayúscula, 1 número y un símbolo.
- La contraseña repetida debe coincidir con la primera.
![Formulario2RecuperarContraseña](img/BorradoresFront/Login/3.2RecuperarContraseña.png)

### Sistema de biblioteca
Se mostrará una biblioteca junto un conjunto de acciones que el usuario podrá realizar
#### 1. Buscar otras librerías
El usuario introducirá el nombre de otro usuario o el nombre de otra librería, mostrando una serie de coincidencias, tras las cuales, se seleccionará la deseada. Esto llevará a la biblioteca de otro usuario, donde podrá ver los libros que tiene y descargarlos, así como acceder al detalle de ellos.

#### 2. Buscar libros
El usuario podrá buscar libros tanto por su título como su autor.

#### 3. Ordenar libros
Se podrán ordenar libros por su fecha de publicación o su puntuación.(pendiente de desarrollar aún)

#### 4. Subir libros
El usuario podrá subir libros que tengan formato PDP o epub, los cuales se guardarán en el sistema, apuntando en la base de datos a su nombre, y en el código el lugar donde se guardan los archivos físicos.

#### 5. Biblioteca
El usuario visualizará nueve libros por pantalla, habiendo un sistema de paginación cuando se supere esa cantidad.
Se verá la portada de cada libro (en caso de los PDF la primera página), así como el título, autor, la puntuación que tienen (esta se calculará en base de las reseñas de los usuarios) y la fecha de subida.
Así mismo, cada libro tendrá un icono para descargarlo y otro de borrar, en el caso que quieran quitarlo de la librería (se elimina de la base de datos y del repo donde se guardan, así que esta acción será irreversible, por lo que habrá que confirmarlo).

![BorradorBiblioteca](img/BorradoresFront/Biblioteca/1.Librería.png)

### Sistema de detalle del libro
El usuario visualizará el detalle del libro, pudiendo diferenciarse 4 partes:

#### 1. Detalle
Se visualizará la portada del libro, junto su título, autor y la nota media evaluada por estrellas, con un máximo de 5. Esta nota será calculada a partir de media de las puntuaciones de las reseñas. Así mismo, habrá un botón para poder leer el libro, llevándote a otra página para ello al hacer click.

#### 2. Contador de reseñas
Se mostrará una card con el número de reseñas totales para el libro.

#### 3. Formulario de reseña
Será una card donde podrás poner la puntuación en estrellas y un comentario. Como mínimo, la nota será media estrellas (corresponde a un 1/10) y la máxima de 5 estrellas (10/10).

#### 4. Visualización de reseñas
Si no hay reseñas se mostrará el mensaje "No hay opiniones todavía. ¡Sé el primero en dejar una reseña!", con el objetivo de animar a la gente que haya leído ese libro a dejar su opinión para otros posibles lectores.
Si hay reseñas, estas se mostrarán en diferentes cards, teniendo un scroll interno, de manera que se pueda navegar entre ellas, mostrándose primero las más recientes. 
Se mostrará un botón de "Eliminar reseña" para el propio autor de esta como para el usuario con rol administrador.

#### 5. Botón de volver a la librería
Es un botón para regresar a la librería en la que se estaba. 

![BorradorDetalleLibro](img/BorradoresFront/Biblioteca/2.DetalleLibro.png)

### Sistema de admin
El administrador visualizará en una tabla todos los usuarios y sus bibliotecas que hay en la aplicación, visualizando su estado. Tendrá la opción de bloquear al usuario o eliminarlo, pudiendo rectificar dentro de los 3 o 15 días posteriores a la respectiva acción.
El administrador, podrá acceder a la biblioteca de cualquier usuario, pudiendo eliminar libros, así como si entra en el detalle de estos, puede eliminar reseñas.

![BorradorPanelAdmin](img/BorradoresFront/PanelAdmin/1.%20PanelAdmin.png)
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
- Visualización, creación y eliminación de reseñas.
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
- **Subida de algunos libros epub**: los libros con formato epub son archivos zip, cuyos metadatos se definen en un archivo *content.opf*. En estos, la imagen del libro se guarda de diferentes maneras, por lo que a veces, al intentar subir un libro con este formato falla. Sería necesario hacer una investigación un poco más profunda para saber exactamente cuáles son las rutas más usadas.
- **Edición de medatos del libro**: esto en función del tiempo, podrá ser incorporado.
- **Aplicación responsive**: la aplicación sólo se mostrará para web de escritorio  por falta de tiempo.

### Planificación
Elaboré un [calendario en Trello](https://trello.com/b/u07xmNm6/mi-tablero-de-trello), definiendo todas lo que hice durante unos rangos basados en las fechas de entregas

### Gastos
Se ha hecho un pequeño estudio en referencia a los costes que acarrearía llevar el proyecto a producción. A continuación, se procede a hacer una estimación de estos
- **Infraestructura**:se necesitarán contratar varios servicios en la nube (servidores, bases de datos,etc). En función del proveedor y la estabilidad que se desee, el coste será de 200 a 600€ anuales.
- **Dominio y certificados**: se estima unos 15€ anuales, ya que se pueden usar cerficados SSL gratuitos.
-  **Mantenimiento y supervisión**: para garantizar la calidad del proyecto y conseguir una mayor facilidad para reflejar las incidencias, se usarán sistemas de monitorización como Kibana y Grafana. El coste estimado es de 50 a 200€ anuales
-  **Costes de desarrollo**: se usarán licencias como Docker Pro, Figma Professional o Postman Professional entre otras. El coste estimado es de 100 a 300€ anuales.
-  **Costes operativos**: el hecho de tener un ordenador, ya lo abarata. Pero así mismo, se estima que el coste de la electricidad e intenet sea de 150€ mensuales.
- **Costes de personal**: no habrá, ya que el proyecto se hará de manera individual.
En resumen, con el objetivo de garantizar calidad más una infraestructura estable, el coste total del proyecto será de 2165 a 2915€ anuales.  

### Normativa
Al poder todos los usuarios subir libros, estos tendrán que cumplir con la normativa vigente española de propiedad intelectual. 
No se permitirá subir ni compartir obras protegidas por derechos de autor sin el permiso del propietario. Si se detecta contenido que incumpla la normativa, será eliminado de la plataforma, tomando las medidad oportunas contra el usuario infractos.
En cuanto a los datos personales (como nombre, apellidos y fecha de nacimiento), estos se usan únicamente para la gestión del perfil y se tratan de forma segura y confidencial, conforme al RGPD y la Ley de Protección de Datos española. Nunca se compartirá información con terceros y se garantizará la privacidad de sus usuarios.

### Ideas de implementación para el futuro
- Creación de un nuevo rol llamado Moderador. Estos serán usuarios normales que tendrán una autorización semejante a la del administrador, de manera que haya una mayor supervisión de los usuarios, ya que cumplirían las mismas funciones. En cualquier momento, este poder podría ser revocado por cualquier motivo.
- Permitir la subida de archivos con otros formatos.
- Permiti la subidad de cualquier libro con formato epub.
- Mejorar la lectura de libros epub. Actualmente, sólo se leer, y no guarda el estado. Se seguiría implementando la solución que se ha hecho con ReactReader.
- Implementación de tests de integración para asegurar la calidad del proyecto.

## TODO: A partir de este punto eres libre de organizar la documentación como estimes pero debes desarrollar el cuerpo de tu proyecto con apartados y subapartados que completen tu documentación

> Hemos elaborado un [checklist](checklist.md) de puntos necesarios para tu PFC, para que revises estas recomendaciones/especificaciones.
> Apóyate en tu tutor/a si tienes duda de cómo organizar tu proyecto y estos apartados/subapartado. Cada proyecto y su contexto determinará la mejor forma de estructurarlo. Piensa bien cómo lo vas a hacer.

## Conclusiones

> Deja esta apartado para el final. Realiza un resumen de todo lo que ha supuesto la realización de tu proyecto. Debe ser una redacción breve. Un resumen de los hitos conseguidos más importantes y de lo aprendido durante el proceso.
> Puede ser un buen punto de partida para organizar tu presentación y ajustarla al tiempo que tienes.

## Referencias, Fuentes consultadas y Recursos externos: Webgrafía

> *TODO*: Enlaces externos y descipciones de estos enlaces que creas conveniente indicar aquí. Generalmente ya van a estar integrados con tu documentación, pero si requieres realizar un listado de ellos, este es el lugar.
