from sqlalchemy import func
from dao.reseña_dao import Reseña
from dao.libro_subido_dao import LibroSubido
from database.db import db


def update_uploaded_book_rating(id_book, id_user):
    """Calcula la puntuación media de las reseñas de un libro"""
    
    #Obtener la media
    avg_rating = db.session.query(func.avg(Reseña.book_rating)) \
        .filter(Reseña.book_id == id_book).scalar()
    
    #Redondear al primer decimal
    avg_rating = round(avg_rating, 1) if avg_rating else 0.0
    
    #Actualizar rating libro subido
    libro_subido = LibroSubido.query.filter_by(book_id=id_book, user_id=id_user).first()
    
    libro_subido.rating = avg_rating
    
    try:
        db.session.commit()
    except Exception as e:
        print(f"Error al actualizar rating: {e}")
        db.session.rollback()
        
    return avg_rating