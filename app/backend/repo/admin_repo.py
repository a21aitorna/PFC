from flask import jsonify
from dao.persona_dao import Persona
from dao.rol_dao import Rol

def get_all_not_admin_users():
    """Conseguir todos los usuarios de la aplicación que no sean admin"""
    users = Persona.query.join(Rol).filter(Rol.role_name != 'Admin').all()
    users_dict = [user.as_dict() for user in users]
    return jsonify(users_dict)