from datetime import date, timedelta
from database.db import db
from dao.persona_dao import Persona

def automatic_unblock_users():
    today = date.today()
    three_days_ago = today - timedelta(days=3)
    
    expired_users = Persona.query.filter(Persona.is_blocked==True, Persona.block_date<= three_days_ago).all()
    for user in expired_users:
        user.is_blocked = False
        user.block_date = None

    if expired_users:
        db.session.commit()
    else:
        print("No había usuarios para desbloquear.")
