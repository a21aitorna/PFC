from flask import Blueprint
from flasgger import swag_from
from features.admin.controller.admin_controller import (get_not_admin_users_controller,
                                                        block_user_controller,
                                                        unblock_user_controller)
from utils.jwt_decorator import admin_required

admin_routes = Blueprint('admin_routes', __name__, url_prefix="/api/admin")

get_not_admin_users_swagger_path = '/app/backend/docs/admin/get_not_admin_users_swagger.yml'
block_user_swagger_path = '/app/backend/docs/admin/block_user_swagger.yml'
unblock_user_swagger_path = '/app/backend/docs/admin/unblock_user_swagger.yml'

def register_admin_routes(app):
    app.register_blueprint(admin_routes)
    
@admin_routes.get('/not-admin-users')
@swag_from(get_not_admin_users_swagger_path)
@admin_required
def get_not_admin_users_route():
    """"Devuelve los usuario que no son admin"""
    return get_not_admin_users_controller()

@admin_routes.post('/block/<int:id_user>')
@admin_required
def block_user_route(id_user):
    return block_user_controller(id_user)

@admin_routes.post('/unblock/<int:id_user>')
@admin_required
def unblock_user_route(id_user):
    return unblock_user_controller(id_user)