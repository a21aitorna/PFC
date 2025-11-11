import os
from utils.extractor_metadatos import extract_metadata
from database.db import db
from dao import Libro, LibroSubido, Categoria, LibroCategoria

UPLOAD_FOLDER = 'uploads/books'

def save_book_file(file_storage):
    """Guarda el archivo físico en uploads/books y devuelve la ruta"""
    filename = file_storage.filename
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file_storage.save(file_path)
    return file_path, filename

def save_book(file_path, filename, user_id):
    """Extrae metadatos y guarda libro en DB junto con categorías y subida de usuario"""
    metadata = extract_metadata(file_path, filename)
    if not metadata:
        return None, "No se pudieron extraer metadatos"

    try:
        # Guardar libro
        libro = Libro(
            title=metadata['title'],
            author=metadata['author'],
            cover=metadata['cover_path'],
            file=file_path
        )
        db.session.add(libro)
        db.session.commit()

        # Guardar categorías
        for cat_name in metadata.get('categories', []):
            category = Categoria.query.filter_by(category_name=cat_name).first()
            if not category:
                category = Categoria(cat_name)
                db.session.add(category)
                db.session.commit()

            libro_categoria = LibroCategoria(book_id=libro.id_book, category_id=category.id_category)
            db.session.add(libro_categoria)
        db.session.commit()

        # Registrar subida del usuario
        subida = LibroSubido(user_id=int(user_id), book_id=libro.id_book)
        db.session.add(subida)
        db.session.commit()

        return libro, None

    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar libro: {e}")
        return None, str(e)

def get_book_by_id(book_id):
    """Obtener libro por ID"""
    return Libro.query.get(book_id)
