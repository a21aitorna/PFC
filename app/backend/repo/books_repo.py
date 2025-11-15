import os
import shutil
from werkzeug.utils import secure_filename
import uuid
from typing import Tuple, Optional
from utils.extractor_metadatos import extract_metadata
from database.db import db
from dao.libro_dao import Libro
from dao.libro_subido_dao import LibroSubido
from dao.categoria_dao import Categoria
from dao.libro_categoria_dao import LibroCategoria

# --- Rutas de carpetas ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # backend/repo
UPLOADS_FOLDER = os.path.join(BASE_DIR, '../uploads')   # backend/uploads
BOOKS_FOLDER = os.path.join(UPLOADS_FOLDER, 'books')
COVERS_FOLDER = os.path.join(UPLOADS_FOLDER, 'covers')


# ------------------------------
# utilidades
# ------------------------------

def ensure_directories():
    """Asegura que existan los directorios necesarios"""
    os.makedirs(BOOKS_FOLDER, exist_ok=True)
    os.makedirs(COVERS_FOLDER, exist_ok=True)


def save_book_file(file_storage) -> Tuple[str, str]:
    """
    Guarda el archivo del libro en uploads/books (devuelve la ruta absoluta y el filename).
    """
    ensure_directories()

    filename = secure_filename(file_storage.filename)
    unique_filename = f"{uuid.uuid4().hex}_{filename}"

    file_path = os.path.join(BOOKS_FOLDER, unique_filename)
    file_storage.save(file_path)

    print(f"Archivo guardado en: {os.path.abspath(file_path)}")

    return file_path, unique_filename  # SOLO filename para la base de datos


def save_cover(cover_path) -> Optional[str]:
    """
    Guarda la portada en uploads/covers y devuelve solo el filename.
    """
    if not cover_path or not os.path.exists(cover_path):
        return None

    try:
        ensure_directories()

        original_filename = os.path.basename(cover_path)
        cover_filename = f"{uuid.uuid4().hex}_{original_filename}"

        new_cover_path = os.path.join(COVERS_FOLDER, cover_filename)

        shutil.copy2(cover_path, new_cover_path)

        try:
            os.remove(cover_path)
        except OSError as e:
            print(f"Advertencia: No se pudo eliminar archivo temporal {cover_path}: {e}")

        return cover_filename  # <-- SOLO nombre
    except Exception as e:
        print(f"Error guardando portada: {e}")
        return None


def get_or_create_category(cat_name):
    category = Categoria.query.filter_by(category_name=cat_name).first()
    if not category:
        category = Categoria(category_name=cat_name)
        db.session.add(category)
        db.session.flush()
    return category


def save_book_categories(libro, categories):
    for cat_name in categories:
        if cat_name and cat_name.strip():
            category = get_or_create_category(cat_name.strip())
            libro_categoria = LibroCategoria(book_id=libro.id_book, category_id=category.id_category)
            db.session.add(libro_categoria)


def save_book(file_path: str, filename: str, user_id: int) -> Tuple[Optional[Libro], Optional[str]]:
    """
    Guarda el libro, su portada y metadatos en BD.
    filename -> el nombre del archivo del libro.
    """
    metadata = extract_metadata(file_path, filename)
    if not metadata:
        return None, "No se pudieron extraer metadatos"

    try:
        # Guardar portada: devuelve SOLO filename
        cover_filename = save_cover(metadata.get('cover_path'))

        book_filename = filename  # filename ya es solo el nombre del archivo

        libro = Libro(
            title=metadata.get('title', 'Sin título'),
            author=metadata.get('author', 'Autor desconocido'),
            cover=cover_filename,
            file=book_filename
        )
        db.session.add(libro)
        db.session.flush()

        # Categorías
        save_book_categories(libro, metadata.get('categories', []))

        # Relación usuario - libro
        subida = LibroSubido(user_id=user_id, book_id=libro.id_book)
        db.session.add(subida)

        db.session.commit()
        return libro, None

    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar libro: {e}")

        # Limpieza
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
            if metadata.get('cover_path') and os.path.exists(metadata['cover_path']):
                os.remove(metadata['cover_path'])
        except Exception as cleanup_error:
            print(f"Error en limpieza: {cleanup_error}")

        return None, f"Error en base de datos: {str(e)}"

def get_user_books(user_id: int):
    return (
        db.session.query(Libro)
        .join(LibroSubido, Libro.id_book == LibroSubido.book_id)
        .filter(LibroSubido.user_id == user_id)
        .all()
    )
