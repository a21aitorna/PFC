import os
import logging
from flask import Blueprint, request
from flasgger import swag_from
from werkzeug.utils import secure_filename

from features.book.controller.book_controller import (
    upload_book_controller,
    get_user_books_controller,
    get_book_cover_controller
)

book_routes = Blueprint('book_routes', __name__, url_prefix="/api/books")

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

upload_book_swagger_path = '/app/backend/docs/books/upload_book_swagger.yml'
get_user_books_path = '/app/backend/docs/books/get_user_books_swagger.yml'


def register_book_routes(app):
    app.register_blueprint(book_routes)
    logger.info("📚 Book routes registered successfully.")


# ----------------------------------------------------------
#   SUBIR LIBRO
# ----------------------------------------------------------

@book_routes.post('/upload')
@swag_from(upload_book_swagger_path)
def upload_book_route():
    logger.info(
        f"📥 POST /upload | Files: {list(request.files.keys())} | Form: {request.form.to_dict()}"
    )
    return upload_book_controller()


# ----------------------------------------------------------
#   GET LIBROS DEL USUARIO
# ----------------------------------------------------------

@book_routes.get('/user/<int:user_id>')
@swag_from(get_user_books_path)
def get_user_books(user_id):

    logger.info(
        f"📘 GET /user/{user_id} | From IP: {request.remote_addr}"
    )

    return get_user_books_controller(user_id)


# ----------------------------------------------------------
#   SERVIR PORTADA
# ----------------------------------------------------------

@book_routes.get("/cover/<filename>")
def serve_cover(filename):
    safe_name = secure_filename(filename)

    logger.info(
        f"🖼️ GET /cover/{safe_name} | Original filename param: {filename} | From IP: {request.remote_addr}"
    )

    return get_book_cover_controller(safe_name)


# ----------------------------------------------------------
#   Configuración global de logging
# ----------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)
