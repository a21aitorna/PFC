from dao.persona_dao import Persona
from database.db import db

def get_user_by_username(username):
    """Obtener usuario por su nombre de usuario"""
    user = Persona.query.filter_by(username=username).first()
    return user

def save_user(person):
    """Guarda un usuario en la base de datos"""
    try:
        db.session.add(person)
        db.session.commit()
        return person
    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar usuario: {e}")
        raise e
    
def get_security_question_by_username(username):
    """Obtener la pregunta de seguridad del usuario"""
    user = get_user_by_username(username)
    return user.security_question

def get_answer_by_username(username):
    """Obtener la respuesta del usuario"""
    user = get_user_by_username(username)
    return user.answer

def update_user_password(username, hashed_password):
    """Actualizar la contraseña del usuario"""
    user = get_user_by_username(username)
    user.password = hashed_password
    # db.session.flush() -> se escribe en base de datos pero no confirma el cambio
    db.session.commit()
    return user