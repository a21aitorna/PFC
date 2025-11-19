from flask import Blueprint
from flasgger import swag_from
from features.admin.controller.admin_controller import get_not_admin_users_controller
from utils.admin_required import admin_required

admin_routes = Blueprint('admin_routes', __name__, url_prefix="/api/admin")

get_not_admin_users_swagger_path = '/app/backend/docs/books/get_not_admin_users_swagger.yml'

def register_admin_routes(app):
    app.register_blueprint(admin_routes)
    
@admin_routes.get('/not-admin-users')
@admin_required
def get_not_admin_users_route():
    """"Devuelve los usuario que no son admin"""
    return get_not_admin_users_controller()