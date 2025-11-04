from flask import jsonify, request
from werkzeug.security import generate_password_hash
from datetime import datetime
from validations.password_validation import validate_password
from validations.age_validation import age_validation
from repo.users_repo import (get_user_by_username, save_user)
from dao.persona_dao import Persona
from exceptions.http_status import (USER_NOT_FOUND_MSG, INTERNAL_SERVER_ERROR_MSG, BAD_REQUEST_EMPTY_REGISTER_MSG, BAD_REQUEST_PASSWORD_MISMATCH_REGISTER_MSG, 
                                    BAD_REQUEST_INVALID_PASSWORD_REGISTER_MSG, BAD_REQUEST_INVALID_DATE_REGISTER_MSG, BAD_REQUEST_UNDERAGE_REGISTER_MSG, BAD_REQUEST_USERNAME_ALREADY_EXISTS_REGISTER_MSG, 
                                    USER_CORRECT_REGISTER_MSG, BAD_REQUEST_EMPTY_RECOVER_PASSWORD_MSG, USER_FOUND_RECOVER_PASSWORD_MSG)

def register_user():
    """Registrar un usuario nuevo"""
    data = request.get_json()
    
    required_fields = [
        'name', 'surname', 'username', 'password',
        'born_date', 'library_name', 'security_question', 'answer'
    ]
    
    #Validación de campos completos
    if not data.get('repeat_password'):
        return BAD_REQUEST_EMPTY_REGISTER_MSG
    for field in required_fields:
        if not data.get(field):
            return BAD_REQUEST_EMPTY_REGISTER_MSG
        
    #Validación de contraseñas iguales
    if data['password'] != data['repeat_password']:
        return BAD_REQUEST_PASSWORD_MISMATCH_REGISTER_MSG
    
    #Validación formato contraseñas
    if not validate_password(data['password']):
        return BAD_REQUEST_INVALID_PASSWORD_REGISTER_MSG
    
    #Validación fecha y edad
    try:
        birth_date = datetime.strptime(data['born_date'], "%Y-%m-%d").date()
    except ValueError:
        return BAD_REQUEST_INVALID_DATE_REGISTER_MSG
    if not age_validation(birth_date):
        return BAD_REQUEST_UNDERAGE_REGISTER_MSG
    
    #Validación de nombre de usuario
    if get_user_by_username(data['username']):
        return BAD_REQUEST_USERNAME_ALREADY_EXISTS_REGISTER_MSG
    
    #Hashear contraseña y respuesta
    hashed_password = generate_password_hash(data['password'])
    hashed_answer = generate_password_hash(data['answer'])
    
    #Crear instancia de persona
    new_user = Persona(
        id_role = 2,
        name = data['name'],
        surname = data['surname'],
        username = data['username'],
        password = hashed_password,
        born_date = birth_date,
        library_name = data['library_name'],
        security_question = data['security_question'],
        answer = hashed_answer
    )
    
    try:
        save_user(new_user)
        return USER_CORRECT_REGISTER_MSG
    except Exception:
        return INTERNAL_SERVER_ERROR_MSG
    
def verify_recover_user():
    """Primer paso de la recuperación de la contraseña, verificar que existe el usuario"""
    try:
        data = request.get_json()
        username = data.get("username")
        
        #Validación de campos completos
        if not username:
            return BAD_REQUEST_EMPTY_RECOVER_PASSWORD_MSG
        
        user = get_user_by_username(username)
        
        #Validación de la existencia del usuario
        if not user:
            return USER_NOT_FOUND_MSG
        
        return USER_FOUND_RECOVER_PASSWORD_MSG
    
    except Exception as e:
        return INTERNAL_SERVER_ERROR_MSG