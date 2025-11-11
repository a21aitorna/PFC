from flask import request, jsonify
from werkzeug.utils import secure_filename
from repo import books_repo

ALLOWED_EXTENSIONS = {'pdf', 'epub'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_book():
    if 'file' not in request.files:
        return jsonify({'error': 'No se encontró el archivo'}), 400

    file = request.files['file']
    user_id = request.form.get('user_id')
    if not user_id:
        return jsonify({'error': 'Se requiere el ID de usuario'}), 400

    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'error': 'Archivo inválido'}), 400

    # Guardar archivo físico
    file_path, filename = books_repo.save_book_file(file)

    # Guardar en DB
    libro, error = books_repo.save_book(file_path, filename, user_id)
    if error:
        return jsonify({'error': error}), 500

    return jsonify({
        'message': 'Libro subido exitosamente',
        'book': libro.as_dict(),
        'uploaded_by_user': user_id
    })
