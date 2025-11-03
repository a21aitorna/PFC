from flask import Blueprint
from flasgger import swag_from
from features.user.controller.user_controller import register_user

user_routes = Blueprint('user_routes', __name__, url_prefix="/api")

register_swagger_path = '/app/backend/docs/users/register_swagger.yml'

def register_user_routes(app):
    app.register_blueprint(user_routes)
    
@user_routes.post('register')
@swag_from(register_swagger_path)
def register_user_route():
    return register_user()