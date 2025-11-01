from flask import Flask
from flask_jwt_extended import JWTManager

from envs.dev.dev_env import config

from dao.categoria_dao import Categoria
from dao.libro_categoria_dao import LibroCategoria
from dao.libro_dao import Libro
from dao.libro_subido_dao import LibroSubido
from dao.persona_dao import Persona
from dao.reseña_dao import Reseña
from dao.rol_dao import Rol
from database.db import init_app

app = Flask(__name__)
app.config.from_object(config['dev'])

init_app(app)
jwt = JWTManager(app)

@app.route('/')
def index():
    return "Comprobación contenedor backend correcto"
