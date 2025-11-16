import os
import logging
from flask import Blueprint, request
from flasgger import swag_from
from werkzeug.utils import secure_filename

from features.book.controller.book_controller import (
    upload_book_controller,
    get_user_books_controller,
    get_book_cover_controller,
    delete_book_controller,
    download_book_controller
)

book_routes = Blueprint('book_routes', __name__, url_prefix="/api/books")

upload_book_swagger_path = '/app/backend/docs/books/upload_book_swagger.yml'
get_user_books_path = '/app/backend/docs/books/get_user_books_swagger.yml'

def register_book_routes(app):
    app.register_blueprint(book_routes)

@book_routes.post('/upload')
@swag_from(upload_book_swagger_path)
def upload_book_route():
    """Sube los libros"""
    return upload_book_controller()

@book_routes.get('/user/<int:user_id>')
@swag_from(get_user_books_path)
def get_user_books(user_id):
    """Devuelve los libros del usuario"""
    return get_user_books_controller(user_id)

@book_routes.get("/cover/<filename>")
def get_book_cover_route(filename):
    """Devuelve la portada del libro"""
    safe_name = secure_filename(filename)
    return get_book_cover_controller(safe_name)

@book_routes.delete("/delete/user/<int:user_id>/book/<int:book_id>")
def delete_book_route(user_id, book_id):
    """Elimina un libro"""
    return delete_book_controller(user_id, book_id)

@book_routes.get("/download/<int:id_book>")
def download_book_route(id_book):
    """Descarga un libro"""
    return download_book_controller(id_book)