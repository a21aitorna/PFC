import logging
from datetime import date, timedelta
from database.db import db
from dao.persona_dao import Persona

logging.basicConfig(
    filename='/var/log/unblock_users.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def automatic_unblock_users():
    today = date.today()
    three_days_ago = today - timedelta(days=3)
    
    expired_users = Persona.query.filter(Persona.is_blocked==True, Persona.block_date<= three_days_ago).all()
    logging.info(f"Usuarios con bloqueo expirado encontrados: {len(expired_users)}")

    for user in expired_users:
        user.is_blocked = False
        user.block_date = None
        logging.info(f"Usuario desbloqueado automáticamente: {user.username}")

    if expired_users:
        db.session.commit()
        logging.info("Desbloqueo automático completado correctamente.")
    else:
        logging.info("No había usuarios para desbloquear.")
