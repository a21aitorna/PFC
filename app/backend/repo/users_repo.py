from dao.persona_dao import Persona
from database.db import db

def get_user_by_username(username):
    """Obtener usuario por su nombre de usuario"""
    user = Persona.query.filter_by(username=username).first()
    return user

def save_user(persona):
    """Guarda un usuario en la base de datos"""
    try:
        db.session.add(persona)
        db.session.commit()
        return persona
    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar usuario: {e}")
        raise e