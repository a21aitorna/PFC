from flask import Flask
from envs.dev.dev_env import config
from database.db import init_app

app = Flask(__name__)
app.config.from_object(config['dev'])

init_app(app)

@app.route('/')
def index():
    return "Comprobación contenedor backend correcto"
