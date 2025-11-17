from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from validations.password_validation import validate_password
from validations.age_validation import age_validation
from repo.users_repo import (get_user_by_username, save_user, get_security_question_by_username, get_answer_by_username, get_password_by_username, update_user_password, get_user_library_name, get_users_or_libraries)
from dao.persona_dao import Persona
from exceptions.http_status import (USER_NOT_FOUND_MSG, INTERNAL_SERVER_ERROR_MSG, BAD_REQUEST_EMPTY_REGISTER_MSG, BAD_REQUEST_PASSWORD_MISMATCH_REGISTER_MSG, 
                                    BAD_REQUEST_INVALID_PASSWORD_REGISTER_MSG, BAD_REQUEST_INVALID_DATE_REGISTER_MSG, BAD_REQUEST_UNDERAGE_REGISTER_MSG, BAD_REQUEST_USERNAME_ALREADY_EXISTS_REGISTER_MSG, 
                                    USER_CORRECT_REGISTER_MSG, BAD_REQUEST_EMPTY_RECOVER_PASSWORD_MSG, USER_FOUND_RECOVER_PASSWORD_MSG, BAD_REQUEST_ANSWER_MISMATCH_RECOVER_PASSWORD_MSG,
                                    BAD_REQUEST_PASSWORD_MISMATCH_RECOVER_PASSWORD_MSG, BAD_REQUEST_INVALID_PASSWORD_RECOVER_PASSWORD_MSG, USER_PASSWORD_UPDATED_MSG, BAD_REQUEST_USERNAME_NOT_FOUND_MSG, BAD_REQUEST_SAME_PASSWORD_RECOVER_PASSWORD_MSG)

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
    
def get_security_question():
    """Devuelve la pregunta de seguridad del usuario (ya validado)"""
    try:
        username = request.args.get("username")
        #Valida si se envía nombre de usuario
        if not username:
            return BAD_REQUEST_USERNAME_NOT_FOUND_MSG
        
        user = get_user_by_username(username)
        #Valida si existe el usuario
        if not user:
            return USER_NOT_FOUND_MSG
        
        question = get_security_question_by_username(username)
        return jsonify({"security_question": question}), 200
    
    except Exception as e:
        print(f"Error en get_security_question: {e}")
        
def update_new_password():
    """Segundo paso de la recuperación de la contraseña, verificar la respuesta y poner la nueva contraseña"""
    try:
        data = request.get_json()
        username = data.get("username")
        answer = data.get("answer")
        password = data.get("password")
        repeat_password = data.get("repeat_password")
        
        fields = [answer, password, repeat_password]
       
        #Valida si existe el nombre de usuario
        if not username:
            return BAD_REQUEST_USERNAME_NOT_FOUND_MSG
        
        #Validación de campos completos
        if not all(fields):
           return BAD_REQUEST_EMPTY_RECOVER_PASSWORD_MSG

        #Validar respuesta de seguridad
        hashed_anwer = get_answer_by_username(username)
        if not check_password_hash(hashed_anwer,answer):
            return BAD_REQUEST_ANSWER_MISMATCH_RECOVER_PASSWORD_MSG
       
        #Validar que las contraseñas sean iguales
        if password != repeat_password:
            return BAD_REQUEST_PASSWORD_MISMATCH_RECOVER_PASSWORD_MSG
    
        #Validar formato de la contraseña
        if not validate_password(password):
            return BAD_REQUEST_INVALID_PASSWORD_RECOVER_PASSWORD_MSG
        
        #Validar que la nueva contraseña no sea la misma que la que se tiene
        old_password = get_password_by_username(username)
        if check_password_hash(old_password, password):
            return BAD_REQUEST_SAME_PASSWORD_RECOVER_PASSWORD_MSG
                    
        #Hashear y actualizar contraseña
        hashed_password = generate_password_hash(password)
        update_user_password(username, hashed_password)
        
        return USER_PASSWORD_UPDATED_MSG
    
    except Exception as e:
        return INTERNAL_SERVER_ERROR_MSG
    
def get_user_library_name_controller():
    """Devuelve el nombre de la librería del usuario"""
    try:
        username = request.args.get("username")
        #Valida si existe el nomnbre de usuario
        if not username:
            return BAD_REQUEST_USERNAME_NOT_FOUND_MSG
        
        user = get_user_by_username(username)
        #Valida si existe el usuario
        if not user:
            return USER_NOT_FOUND_MSG
        
        library_name = get_user_library_name(username)
        return jsonify({"library_name": library_name}), 200
    
    except Exception as e:
        print(f"Error al intentar obtener el nombre de la librería: {e}")
        
def search_users_controller(searched_text):
    """Busca el usuario o nombre de librería coincida con lo que se pase"""
    try:
        searched_users = get_users_or_libraries(searched_text)
        
        result = [
            {
                'id': searched_user.id_user,
                'username': searched_user.username,
                'libraryName': searched_user.library_name,
            }
            for searched_user in searched_users
        ]
        return jsonify(result), 200
    except Exception as e:
        print(f"Error buscando usuarios: {e}")
        return jsonify({'error': 'Error en la búsqueda'}), 500