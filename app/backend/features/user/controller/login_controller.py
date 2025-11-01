from flask import request, jsonify
from flask_jwt_extended import create_access_token
from dao.persona_dao import Persona
from werkzeug.security import check_password_hash
from dao_schema.persona_schema import PersonaSchema
import jwt
import datetime

from app.backend.exceptions.http_status import (BAD_REQUEST_EMPTY_LOGIN_MSG, BAD_REQUEST_USERNAME_LOGIN_MSG, BAD_REQUEST_PASSWORD_LOGIN_MSG, USER_NOT_FOUND_MSG, UNAUTHORIZED_LOGIN_MSG)

# personas_schema = PersonaSchema(many=True)

def login_controller():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    
    if not username and not password:
        return BAD_REQUEST_EMPTY_LOGIN_MSG
    if not username:
        return BAD_REQUEST_USERNAME_LOGIN_MSG
    if not password:
        return BAD_REQUEST_PASSWORD_LOGIN_MSG
    
    user = Persona.query.filter_by(username=username).first()
    
    if not user:
        return USER_NOT_FOUND_MSG
    if not check_password_hash(user.password, password):
        return UNAUTHORIZED_LOGIN_MSG
    
    acces_token = create_access_token(identity = {
        "id_user": user.id_user,
        "id_role": user.id_role,
        "name": user.name,
        "username": user.username
    })
    return jsonify ({
        "msg": "The user has logged correctly",
        "token": acces_token,
        "user":{
            "id_user": user.id_user,
            "id_role": user.id_role,
            "name": user.name,
            "username": user.username
        }
    }),200
    
    