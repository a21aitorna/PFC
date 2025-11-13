from flask import request, jsonify
from repo import books_repo
from repo.users_repo import get_user_by_user_id
from exceptions.http_status import (
    USER_NOT_FOUND_MSG,
    BAD_REQUEST_BOOK_NOT_FOUND_UPLOAD_BOOK,
    BAD_REQUEST_USER_NOT_FOUND_UPLOAD_BOOK,
    BAD_REQUEST_INVALID_FILE_UPLOAD_BOOK
)

ALLOWED_EXTENSIONS = {'pdf', 'epub'}

def allowed_file(filename):
    """Revisa los formatos de los libros, permitiendo sólo PDF y EPUB"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_book_controller():
    """Subir libro y devolver rutas relativas de libro y portada para front"""
    
    # Validar archivo
    if 'file' not in request.files:
        return BAD_REQUEST_BOOK_NOT_FOUND_UPLOAD_BOOK

    file = request.files['file']
    user_id = request.form.get('user_id')
    
    if not user_id:
        return BAD_REQUEST_USER_NOT_FOUND_UPLOAD_BOOK

    if file.filename == '' or not allowed_file(file.filename):
        return BAD_REQUEST_INVALID_FILE_UPLOAD_BOOK

    # Guardar archivo físico en uploads/books
    file_path, filename = books_repo.save_book_file(file)

    # Guardar libro y portada en DB
    libro, error = books_repo.save_book(file_path, filename, user_id)
    if error:
        return jsonify({'error': error}), 500

    # Rutas relativas que podrá usar el front
    book_file_url = f"/uploads/{libro.file}" if libro.file else None
    cover_file_url = f"/uploads/{libro.cover}" if libro.cover else None

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
    """Obtener todos los libros de un usuario y devolver JSON listo para el front"""
    user = get_user_by_user_id(user_id)
    if not user:
        return USER_NOT_FOUND_MSG
    libros = books_repo.get_user_books(user_id)
    result = []
    for libro in libros:
        result.append({
            "id_book": libro.id_book,
            "title": libro.title,
            "author": libro.author,
            "cover": f"/{libro.cover}" if libro.cover else None,
            "file": f"/{libro.file}" if libro.file else None,
        })
    return jsonify(result)