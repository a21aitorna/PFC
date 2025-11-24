from flask import Blueprint
from flasgger import swag_from
from werkzeug.utils import secure_filename

from features.book.controller.book_controller import (
    upload_book_controller,
    get_user_books_controller,
    get_book_cover_controller,
    delete_book_controller,
    download_book_controller,
    get_detail_uploaded_book_controller,
    post_review_book_controller
)

book_routes = Blueprint('book_routes', __name__, url_prefix="/api/books")

upload_book_swagger_path = '/app/backend/docs/books/upload_book_swagger.yml'
get_user_books_path_swagger_path = '/app/backend/docs/books/get_user_books_swagger.yml'
get_cover_book_path_swagger_path = '/app/backend/docs/books/get_cover_book_swagger.yml'
delete_book_path_swagger_path = '/app/backend/docs/books/delete_book_swagger.yml'
download_book_path_swagger_path = '/app/backend/docs/books/download_book_swagger.yml'

def register_book_routes(app):
    app.register_blueprint(book_routes)

@book_routes.post('/upload')
@swag_from(upload_book_swagger_path)
def upload_book_route():
    """Sube los libros"""
    return upload_book_controller()

@book_routes.get('/user/<int:user_id>')
@swag_from(get_user_books_path_swagger_path)
def get_user_books_route(user_id):
    """Devuelve los libros del usuario"""
    return get_user_books_controller(user_id)

@book_routes.get("/cover/<filename>")
@swag_from(get_cover_book_path_swagger_path)
def get_book_cover_route(filename):
    """Devuelve la portada del libro"""
    safe_name = secure_filename(filename)
    return get_book_cover_controller(safe_name)

@book_routes.delete("/delete/user/<int:user_id>/book/<int:book_id>")
@swag_from(delete_book_path_swagger_path)
def delete_book_route(user_id, book_id):
    """Elimina un libro"""
    return delete_book_controller(user_id, book_id)

@book_routes.get("/download/<int:id_book>")
@swag_from(download_book_path_swagger_path)
def download_book_route(id_book):
    """Descarga un libro"""
    return download_book_controller(id_book)

@book_routes.get("/detail-book/<int:id_book>")
def get_detail_uploaded_book_route(id_book):
    """Consgiue el detalle de un libro"""
    return get_detail_uploaded_book_controller(id_book)

@book_routes.post("/book/<int:id_book>/review")
def post_review_book_route(id_book):
    return post_review_book_controller(id_book)