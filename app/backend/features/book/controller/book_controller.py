import logging
import os
from flask import request, jsonify, make_response, abort,send_from_directory
from werkzeug.utils import secure_filename
from repo.books_repo import save_book_file, save_book, get_user_books, delete_book, get_book_by_id
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
    ERROR_DELETING_BOOK_MSG,
    BOOK_NOT_FOUND_DOWNLOAD_MSG,
    BAD_REQUEST_BOOK_HAS_NOT_FILE_MSG,
    BOOK_FILE_NOT_FOUND_MSG,
    DOWNLOAD_BOOK_ERROR_MSG,
    COVER_NOT_FOUND_MSG
)

logging.basicConfig(level=logging.DEBUG)

ALLOWED_EXTENSIONS = {'pdf', 'epub'}

BOOKS_FOLDER = os.path.join(os.getcwd(), "uploads", "books")

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

    # Guardar libro y portada en BD
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

    base_folder = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'uploads', 'covers')
    file_path = os.path.join(base_folder, filename)

    if not os.path.exists(file_path):
        response = make_response(*COVER_NOT_FOUND_MSG)
        abort(response)

    return send_from_directory(base_folder, filename)


def delete_book_controller(user_id, book_id):
    """Eliminar un libro de la librería de un usuario, incluyendo archivos físicos"""
    
    # Valida si el usuario existe en la base de datos
    user = get_user_by_user_id(user_id)
    if not user:
        return USER_NOT_FOUND_MSG
    
    # Valida si el libro existe
    if not book_id:
        return BAD_REQUEST_BOOK_NOT_FOUND_DELETE_MSG
    
    # Valida si el usuario existe
    if not user_id:
        return BAD_REQUEST_USER_NOT_FOUND_DELETE_MSG
    
    try:
        success = delete_book(user_id, book_id)
        
        if not success:
            return BAD_REQUEST_BOOK_COULD_NOT_BE_DELETED_MSG
        
        return BOOK_CORRECT_DELETE_MSG
        
    except Exception as e:
        print(f"Exception en delete_book_controller: {e}")
        return ERROR_DELETING_BOOK_MSG
    

def download_book_controller(id_book):
    """Descargar un libro"""
    try:
        libro = get_book_by_id(id_book)
        if not libro:
            return BOOK_NOT_FOUND_DOWNLOAD_MSG
             
        if not libro.file:
            return BAD_REQUEST_BOOK_HAS_NOT_FILE_MSG
        
        file_path = os.path.join(BOOKS_FOLDER, libro.file)
        if not os.path.exists(file_path):
            return BOOK_FILE_NOT_FOUND_MSG

        return send_from_directory(BOOKS_FOLDER, libro.file, as_attachment=True)
    
    except Exception as e:
        print(f"Error descargando el libro: {e}")
        return DOWNLOAD_BOOK_ERROR_MSG