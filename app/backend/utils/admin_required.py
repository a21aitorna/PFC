from functools import wraps
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from dao.persona_dao import Persona
from exceptions.http_status import USER_NOT_FOUND_MSG, UNAUTHORIZED_MSG
from repo.users_repo import get_user_by_user_id
def admin_required(f):
    @wraps(f)
    @jwt_required()  # Valida que haya un token válido
    def decorated_function(*args, **kwargs):
        user_id = int(get_jwt_identity())  #Se obtiene el id del token
        user = get_user_by_user_id(user_id)
        
        if not user:
            return USER_NOT_FOUND_MSG
        if user.id_role != 1: 
            return UNAUTHORIZED_MSG
        
        return f(*args, **kwargs)
    return decorated_function