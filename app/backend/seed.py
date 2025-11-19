from datetime import date
from repo.rol_repo import create_role, get_role_by_name
from werkzeug.security import generate_password_hash
from repo.users_repo import save_user, get_user_by_username
from dao.persona_dao import Persona

def seed_roles():
    """Crea los roles inciales Admin y User"""
    create_role("Admin")
    create_role("User")
    
def seed_admin_user():
    """Crea un usuario admin"""
    admin_role = get_role_by_name("Admin")
    if not admin_role:
        raise Exception("No existe el rol admin. Ejecuta el seed_roles")
    if not get_user_by_username("Admin"):
        admin_user = Persona(
            id_role=1,
            name="Admin",
            surname="Admin",
            username = "Admin",
            password = generate_password_hash("Admin123.."),
            born_date=date(1999,9,3),
            library_name="Admin Library",
            security_question="Admin question",
            answer = generate_password_hash("admin_answer")
        )
        save_user(admin_user)