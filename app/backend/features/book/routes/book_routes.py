from flask import Blueprint, request
from flasgger import swag_from
from features.book.controller.book_controller import (upload_book_controller, get_user_books_controller)

book_routes = Blueprint('book_routes', __name__, url_prefix="/api/books")

upload_book_swagger_path = '/app/backend/docs/books/upload_book_swagger.yml'
get_user_books_path = '/app/backend/docs/books/get_user_books_swagger.yml'

def register_book_routes(app):
    app.register_blueprint(book_routes)

@book_routes.post('/upload')
@swag_from(upload_book_swagger_path)
def upload_book_route():
    return upload_book_controller()

@book_routes.get('/user/<int:user_id>')
@swag_from(get_user_books_path)
def get_user_books(user_id):
    return get_user_books_controller(user_id)