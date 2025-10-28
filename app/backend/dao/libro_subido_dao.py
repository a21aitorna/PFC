from database.db import db
from datetime import datetime, timezone

class LibroSubido(db.Model):
    __tablename = 'uploaded_book'
    
    id_uploaded_book = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id_book'), nullable=False)
    upload_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    user = db.relationship('Usuario', backref='libros_subidos', lazy=True)
    book = db.relationship('Libro', backref='subidas', lazy=True)

    def __init__(self, user_id, book_id, upload_date=None):
        self.user_id = user_id
        self.book_id = book_id
        self.upload_date = upload_date or datetime.now(timezone.utc)
        