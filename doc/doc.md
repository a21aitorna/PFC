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
  - [Sistema de detalle del libro](#sistema-de-detalle-del-libro)
  - [Admin](#admin)
- [Alcance](#alcance)
  - [Funcionalidades implementadas](#funcionalidades-implementadas)
  - [Usuarios de la aplicación](#usuarios-de-la-aplicación)
  - [Contexto](#contexto)
  - [Límites](#límites)
  - [Planificación](#planificación)
  - [Gastos](#gastos)
  - [Normativa](#normativa)
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
> Las tengo que redactar bien, sólo tengo un esquema. Así mismo los componentes están sujetos a cambios
~~~
PANTALLA BIBLIOTECA
Tres partes: Header, Estantería y Menú hamburguesa

1º HEADER
	* Elementos
		* Barra superior fija
		* Campo búsqueda (usuario/biblioteca)
		* Botón logout
	* Validaciones
		* No se puede hacer una búsqueda vacía.
		* Al deslogearse, redirige a la página de login.
		* Se elimina el token de sesión.
	* Respuestas back
		* 200 -> todo OK
		* 404 -> No existe la biblioteca/usario buscado.
		* 500 -> error servidor

2º Estantería
	* Elementos
		* Representación de 3 o 4 libros por fila (9 o 12 en total)
		* Cada libro muestra sólo la portada
		* Paginación si hay más de (9 o 12) libros.
	* Validaciones
		* Si hay menos libros de la capacidad máxima, no hay paginación
	* Respuestas back
		* 200 -> Lista portadas devuelta correctamente
		* 204 -> Estantería sin libros
		* 500 -> error servidor

3.1º Menú hamburguesa en biblioteca propia
	* Elementos
		* Subir libro (seleccionar archivo PDF/EPUB)
		* Buscar libro en mi biblioteca por título/autor
		* Filtrar por fecha de subida
		* Filtrar por puntuación.
	* Validaciones
		* El archivo subido debe ser PDF o EPUB.
		* El archivo no puede superar un tamaño límite
		* Al filtrar o buscar, debe haber coincidencias exactas (por ejemplo, si buscas Harry te aparecerán 
		  todos los libros que cuyo autor tenga Harry o que el título lleve Harry).
	* Respuestas back
		* 201 -> Libros subido correctamente
		* 400 -> Formato de archivo no válido
		* 404 -> No se encuentra ningún libro con ese criterio de búsqueda.

3.1º Menú hamburguesa en biblioteca ajena
	* Elementos
		* Buscar libro en mi biblioteca por título/autor
		* Filtrar por fecha de subida
		* Filtrar por puntuación.
	* Validaciones
		* El archivo subido debe ser PDF o EPUB.
		* El archivo no puede superar un tamaño límite
		* Al filtrar o buscar, debe haber coincidencias exactas (por ejemplo, si buscas Harry te aparecerán 
		  todos los libros que cuyo autor tenga Harry o que el título lleve Harry).
	* Respuestas back
		* 400 -> Formato de archivo no válido
		* 404 -> No se encuentra ningún libro con ese criterio de búsqueda.
~~~
### Sistema de detalle del libro
> Las tengo que redactar bien, sólo tengo un esquema. Así mismo los componentes están sujetos a cambios

~~~
PANTALLA DETALLE LIBRO
Dos partes: Información y Reseñas

1º Información del libro
	* Elementos
		* Portada del libro (imagen grande)
		* Título
		* Autor
		* Categorías
		* Puntuación media (1 a 5)
		* Botón Descargar libro (PDF/EPUB)
	* Validaciones
		* El libro debe existir en la base de datos
	* Respuestas back	
		* 200 -> Datos del libro devueltos correctamente
		* 404 -> Libro no encontrado
		* 500 -> Error del servidor

2º Reseñas
	*Elementos
		* Listado de reseñas
		* Botón Añadir reseña
		* Botón Editar / Eliminar reseña (si es tu reseña)
	* Validaciones
		* Solo un usuario puede escribir 1 reseña por libro
		* La reseña tiene un límite de 500 caracteres
	* Respuestas back	
		* 201 -> Reseña creada correctamente
		* 200 -> Reseña editada/eliminada con éxito
		* 400 -> Datos inválidos o reseña duplicada
		* 403 -> No autorizado (editar/eliminar reseña ajena)
		* 404 -> Libro o reseña no encontrada

3. Acciones adicionales en libro de estantería propia
	*Elementos
		* Botón Editar libro (inhabilitado, en función del tiempo)
		* Botón Eliminar libro
		* Botón Editar / Eliminar reseña (si es tu reseña)
	* Validaciones
		* Solo el dueño del libro puede editar o borrar
	* Respuestas back	
		* 201 -> 200 -> Libro editado/eliminado correctamente
		* 400 -> Datos inválidos
		* 403 -> No autorizado
		* 404 -> Libro no encontrado

4. Acciones adicionales en libro de estantería ajena
	*Elementos
		* Botón Añadir a mi biblioteca
	* Validaciones
		* No puedes añadir un libro que ya está en tu biblioteca
	* Respuestas back	
		* 201 -> Libro añadido a la biblioteca correctamente
		* 400 -> El libro ya está en tu biblioteca
		* 403 -> 404 -> Libro no encontrado
~~~

### Admin
> Las tengo que redactar bien, sólo tengo un esquema
~~~
ADMIN
1º Gestión de usuarios
	* Elementos
		* Listado de usuarios (nombre, email, estado, biblioteca asociada, rol)
		* Botón Bloquear usuario
		* Botón Eliminar usuario
		* Botón Rectificar (dentro de los 3 días en caso bloqueo, 15 días si es eliminar)
	* Validaciones
		* No se puede eliminar un usuario ya eliminado definitivamente
		* El administrador no puede eliminarse a sí mismo
		* Un usuario bloqueado no puede acceder a la biblioteca.
		* Un usuario eliminado no puede acceder a la biblioteca.
	* Respuestas back
		* 200 -> Acción realizada con éxito	
		* 400 -> Acción inválida
		* 403 -> No autorizado
		* 404 -> Usuario no encontrado
		* 500 -> Error del servidor

2º Gestión libros/reseñas
	* Elementos
		* Listado de libros (título, autor, usuario propietario, estado).
		* Listado de reseñas (texto, usuario, libro asociado, fecha).
		* Botón Eliminar libro.
		* Botón Eliminar reseña.
	* Validaciones
		* El administrador puede eliminar cualquier libro o reseña que incumpla normas.
		* Una reseña eliminada no se puede recuperar.
		* Un libro eliminado desaparece de todas las bibliotecas donde estaba compartido.
		* El administrador no puede editar libros/reseñas, solo eliminarlos.
	* Respuestas back
		* 200 -> Libro/reseña eliminada con éxito.
		* 400 -> Acción inválida
		* 403 -> No autorizado
		* 404 -> Libro o reseña no encontrada.
		* 500 -> Error del servidor	
~~~

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

### Planificación
Elaboré un [calendario en Trello](https://trello.com/b/u07xmNm6/mi-tablero-de-trello), definiendo todas lo que hice durante unos rangos basados en las fechas de entregas

### Gastos
Al ser una aplicación cuyo fin es que sirva como proyecto final, y no hay previsión de que salga a producción, los gastos son muy bajos. Al contar con ordenador propio, los únicos gastos que se pueden diferenciar son la electricidad y el internet, lo cuál conllevaría un gasto estimado de 150€ en total.

### Normativa
Al poder todos los usuarios subir libros, estos tendrán que cumplir con la normativa vigente española de propiedad intelectual. 
No se permitirá subir ni compartir obras protegidas por derechos de autor sin el permiso del propietario. Si se detecta contenido que incumpla la normativa, será eliminado de la plataforma, tomando las medidad oportunas contra el usuario infractos.
En cuanto a los datos personales (como nombre, apellidos y fecha de nacimiento), estos se usan únicamente para la gestión del perfil y se tratan de forma segura y confidencial, conforme al RGPD y la Ley de Protección de Datos española. Nunca se compartirá información con terceros y se garantizará la privacidad de sus usuarios.


## TODO: A partir de este punto eres libre de organizar la documentación como estimes pero debes desarrollar el cuerpo de tu proyecto con apartados y subapartados que completen tu documentación

> Hemos elaborado un [checklist](checklist.md) de puntos necesarios para tu PFC, para que revises estas recomendaciones/especificaciones.
> Apóyate en tu tutor/a si tienes duda de cómo organizar tu proyecto y estos apartados/subapartado. Cada proyecto y su contexto determinará la mejor forma de estructurarlo. Piensa bien cómo lo vas a hacer.

## Conclusiones

> Deja esta apartado para el final. Realiza un resumen de todo lo que ha supuesto la realización de tu proyecto. Debe ser una redacción breve. Un resumen de los hitos conseguidos más importantes y de lo aprendido durante el proceso.
> Puede ser un buen punto de partida para organizar tu presentación y ajustarla al tiempo que tienes.

## Referencias, Fuentes consultadas y Recursos externos: Webgrafía

> *TODO*: Enlaces externos y descipciones de estos enlaces que creas conveniente indicar aquí. Generalmente ya van a estar integrados con tu documentación, pero si requieres realizar un listado de ellos, este es el lugar.
