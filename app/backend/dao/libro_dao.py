from database.db import db

class Libro(db.Model):
    __tablename__ = 'book'
    
    id_book = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    cover = db.Column(db.String(100), nullable=False)
    file = db.Column(db.String(100), nullable=False)