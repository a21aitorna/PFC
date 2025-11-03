from repo.rol_repo import (get_role_by_name, create_role)

def seed_roles():
    """Crea los roles inciales Admin y User"""
    create_role("Admin")
    create_role("User")