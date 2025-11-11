from flask import request, jsonify
from werkzeug.utils import secure_filename
from repo import books_repo
from exceptions.http_status import (BAD_REQUEST_BOOK_NOT_FOUND_UPLOAD_BOOK, BAD_REQUEST_USER_NOT_FOUND_UPLOAD_BOOK, BAD_REQUEST_INVALID_FILE_UPLOAD_BOOK)
ALLOWED_EXTENSIONS = {'pdf', 'epub'}

def allowed_file(filename):
    """Revisa los formatos de los libros, permitiendo sólo PDD y EPUB"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_book():
    """Subir libro"""
    
    #Validar si el archivo se encuentra
    if 'file' not in request.files:
        return BAD_REQUEST_BOOK_NOT_FOUND_UPLOAD_BOOK

    file = request.files['file']
    user_id = request.form.get('user_id')
    
    #Validar que hay un usuario que sube el libro
    if not user_id:
        return BAD_REQUEST_USER_NOT_FOUND_UPLOAD_BOOK

    #Validar formato de libro seleccionado
    if file.filename == '' or not allowed_file(file.filename):
        return BAD_REQUEST_INVALID_FILE_UPLOAD_BOOK

    #Guardar archivo
    file_path, filename = books_repo.save_book_file(file)

    #Guardar en DB
    libro, error = books_repo.save_book(file_path, filename, user_id)
    #Si hay error devuleve un 500
    if error:
        return jsonify({'error': error}), 500

    return jsonify({
        'message': 'Libro subido exitosamente',
        'book': libro.as_dict(),
        'uploaded_by_user': user_id
    })
