from repo.admin_repo import get_all_not_admin_users

def get_not_admin_users_controller():
    """Controlador para recuperar todos los usuarios que no son admin"""
    return get_all_not_admin_users()