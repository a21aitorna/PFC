from flask import Blueprint, request
from flasgger import swag_from
from features.user.controller import login_controller

login_routes = Blueprint('login_routes', __name__, url_prefix="/api")

#Mantiene la definición de rutas y luego meterlas todas en main.py
def register_login_routes(app):
    app.register_blueprint(login_routes)
    
@login_routes.post('/login')
@swag_from('docs/users/login_swagger.json')
def login_route():
    return login_controller()