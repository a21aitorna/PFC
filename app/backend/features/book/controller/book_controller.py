import logging
import os
from flask import request, jsonify, abort,send_from_directory
from werkzeug.utils import secure_filename
from repo.books_repo import save_book_file, save_book, get_user_books, delete_book
from repo.users_repo import get_user_by_user_id
from exceptions.http_status import (
    USER_NOT_FOUND_MSG,
    BAD_REQUEST_BOOK_NOT_FOUND_UPLOAD_BOOK,
    BAD_REQUEST_USER_NOT_FOUND_UPLOAD_BOOK,
    BAD_REQUEST_INVALID_FILE_UPLOAD_BOOK,
    BAD_REQUEST_BOOK_NOT_FOUND_DELETE_MSG,
    BAD_REQUEST_USER_NOT_FOUND_DELETE_MSG,
    BAD_REQUEST_BOOK_COULD_NOT_BE_DELETED_MSG,
    BOOK_CORRECT_DELETE_MSG,
    ERROR_DELETING_BOOK_MSG
)

ALLOWED_EXTENSIONS = {'pdf', 'epub'}

def allowed_file(filename):
    """Revisa los formatos permitidos."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_book_controller():
    """Subir libro y devolver rutas de libro y portada para el front."""
    
    if 'file' not in request.files:
        return BAD_REQUEST_BOOK_NOT_FOUND_UPLOAD_BOOK

    file = request.files['file']
    user_id = request.form.get('user_id')
    
    if not user_id:
        return BAD_REQUEST_USER_NOT_FOUND_UPLOAD_BOOK

    if file.filename == '' or not allowed_file(file.filename):
        return BAD_REQUEST_INVALID_FILE_UPLOAD_BOOK

    # Guardar libro físico
    file_path, filename = save_book_file(file)

    # Guardar libro + portada en BD
    libro, error = save_book(file_path, filename, user_id)
    if error:
        return jsonify({'error': error}), 500

    # Generar URLs
    book_file_url = f"/api/books/file/{libro.file}" if libro.file else None
    cover_file_url = f"/api/books/cover/{libro.cover}" if libro.cover else None

    return jsonify({
        'message': 'Libro subido exitosamente',
        'book': {
            'id_book': libro.id_book,
            'title': libro.title,
            'author': libro.author,
            'file': book_file_url,
            'cover': cover_file_url
        },
        'uploaded_by_user': user_id
    })



def get_user_books_controller(user_id):
    """Devuelve todos los libros de un usuario."""
    
    user = get_user_by_user_id(user_id)
    if not user:
        return USER_NOT_FOUND_MSG

    libros = get_user_books(user_id)
    result = []

    for libro in libros:
        result.append({
            "id_book": libro.id_book,
            "title": libro.title,
            "author": libro.author,

            "cover": f"http://localhost:5000/api/books/cover/{libro.cover}"
                     if libro.cover else None,

            "file": f"http://localhost:5000/api/books/file/{libro.file}"
                    if libro.file else None,
        })

    return jsonify(result)

def get_book_cover_controller(filename):
    """Devuelve una portada desde uploads/covers."""
    filename = secure_filename(filename)

    base_folder = os.path.join(os.path.dirname(__file__), '..', '..', 'uploads', 'covers')
    file_path = os.path.join(base_folder, filename)

    if not os.path.exists(file_path):
        abort(404)

    from flask import send_from_directory
    return send_from_directory(base_folder, filename)



def get_book_cover_controller(filename):
    # logging.info(f"Solicitando portada: {filename}")

    # Carpeta real donde deberían estar las portadas
    base_folder = os.path.join(
        os.path.dirname(__file__),
        '..', '..', '..', 'uploads', 'covers'
    )

    # Normalizamos la ruta
    base_folder = os.path.abspath(base_folder)

    # file_path = os.path.join(base_folder, filename)

    #  Logs para depuración
    # logging.info(f" Carpeta base donde busca imágenes: {base_folder}")
    # logging.info(f"Ruta completa del archivo buscado: {file_path}")
    # logging.info(f"¿Existe el archivo?: {'Sí' if os.path.exists(file_path) else 'No'}")

    # if not os.path.exists(file_path):
    #     logging.error(f" Portada NO encontrada en: {file_path}")
    #     abort(404, description="Portada no encontrada")

    return send_from_directory(base_folder, filename)

logging.basicConfig(level=logging.DEBUG, format='[%(levelname)s] %(message)s')

def delete_book_controller(user_id, book_id):
    """Eliminar un libro de la librería de un usuario, incluyendo archivos físicos"""
    logging.debug(f"Inicio delete_book_controller - user_id: {user_id}, book_id: {book_id}")
    
    # Valida si el usuario existe en la base de datos
    user = get_user_by_user_id(user_id)
    if not user:
        logging.warning("Usuario no encontrado")
        return USER_NOT_FOUND_MSG
    
    # Valida si el libro existe
    if not book_id:
        logging.warning("book_id no proporcionado")
        return BAD_REQUEST_BOOK_NOT_FOUND_DELETE_MSG
    
    # Valida si el usuario existe
    if not user_id:
        logging.warning("user_id no proporcionado")
        return BAD_REQUEST_USER_NOT_FOUND_DELETE_MSG
    
    try:
        logging.debug("Llamando a delete_book...")
        success = delete_book(user_id, book_id)  # Asegúrate del orden correcto de parámetros
        logging.debug(f"delete_book returned: {success}")
        
        if not success:
            logging.error("delete_book falló")
            return BAD_REQUEST_BOOK_COULD_NOT_BE_DELETED_MSG
        
        logging.info("Libro eliminado correctamente")
        return BOOK_CORRECT_DELETE_MSG
        
    except Exception as e:
        logging.exception(f"Exception en delete_book_controller: {e}")
        return ERROR_DELETING_BOOK_MSG