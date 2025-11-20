from flask import jsonify
from exceptions.http_status import (USER_NOT_FOUND_MSG)
from repo.admin_repo import (get_all_not_admin_users, 
                             block_user, unblock_user, 
                             auto_unblock_user)

def get_not_admin_users_controller():
    """Controlador para recuperar todos los usuarios que no son admin"""
    users = get_all_not_admin_users()
    return jsonify([user.as_dict() for user in users])
        
def block_user_controller(id_user):
    """Controlador para bloquear un usuario"""
    user = block_user(id_user)
    
    if not user:
        return USER_NOT_FOUND_MSG
    
    return jsonify({
        "message": "User blocked for 3 days",
        "block_date": user.block_date
    })
    
def unblock_user_controller(id_user):
    """Controlador para desbloqeuar un usuario"""
    user = unblock_user(id_user)
    
    if not user:
        return USER_NOT_FOUND_MSG
    
    return jsonify({"message": "User has been unblocked"})