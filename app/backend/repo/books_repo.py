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

def ensure_directories():
    """Asegura que existan los directorios necesarios"""
    os.makedirs(BOOKS_FOLDER, exist_ok=True)
    os.makedirs(COVERS_FOLDER, exist_ok=True)

def save_book_file(file_storage) -> Tuple[str, str]:
    """Guardar el libro (PDF/EPUB)B"""
    ensure_directories()
    filename = secure_filename(file_storage.filename)
    unique_filename = f"{uuid.uuid4().hex}_{filename}"
    file_path = os.path.join(BOOKS_FOLDER, unique_filename)
    file_storage.save(file_path)
    print(f"Archivo guardado en: {os.path.abspath(file_path)}")
    relative_path = os.path.join('uploads', 'books', unique_filename)
    return file_path, relative_path

def save_cover(cover_path) -> Optional[str]:
    """Guardar la portada y retornar ruta para DB: uploads/covers/..."""
    if not cover_path or not os.path.exists(cover_path):
        return None

    try:
        ensure_directories()
        # SOLO el nombre del archivo
        original_filename = os.path.basename(cover_path)
        cover_filename = f"{uuid.uuid4().hex}_{original_filename}"
        new_cover_path = os.path.join(COVERS_FOLDER, cover_filename)
        
        # Copiar la imagen a COVERS_FOLDER
        shutil.copy2(cover_path, new_cover_path)
        
        # Intentar eliminar el archivo temporal original
        try:
            os.remove(cover_path)
        except OSError as e:
            print(f"Advertencia: No se pudo eliminar archivo temporal {cover_path}: {e}")

        # Ruta relativa correcta para la DB
        return os.path.join('uploads', 'covers', cover_filename)

    except Exception as e:
        print(f"Error guardando portada: {e}")
        return None

def get_or_create_category(cat_name):
    """Obtener o crear categoría"""
    category = Categoria.query.filter_by(category_name=cat_name).first()
    if not category:
        category = Categoria(category_name=cat_name)
        db.session.add(category)
        db.session.flush()
    return category

def save_book_categories(libro, categories):
    """Guardar las categorías del libro"""
    for cat_name in categories:
        if cat_name and cat_name.strip():
            category = get_or_create_category(cat_name.strip())
            libro_categoria = LibroCategoria(book_id=libro.id_book, category_id=category.id_category)
            db.session.add(libro_categoria)

def save_book(file_path: str, filename: str, user_id: int) -> Tuple[Optional[Libro], Optional[str]]:
    """Guardar libro en DB y portada"""
    metadata = extract_metadata(file_path, filename)
    if not metadata:
        return None, "No se pudieron extraer metadatos"

    try:
        # Guardar la portada y obtener ruta para DB
        relative_cover_path = save_cover(metadata.get('cover_path'))
        
        # Ruta del libro para DB: uploads/books/archivo.epub
        relative_file_path = os.path.join('uploads', 'books', os.path.basename(file_path))

        # Crear libro en DB
        libro = Libro(
            title=metadata.get('title', 'Sin título'),
            author=metadata.get('author', 'Autor desconocido'),
            cover=relative_cover_path,
            file=relative_file_path
        )
        db.session.add(libro)
        db.session.flush()

        # Guardar categorías
        save_book_categories(libro, metadata.get('categories', []))

        # Registrar subida del usuario
        subida = LibroSubido(user_id=user_id, book_id=libro.id_book)
        db.session.add(subida)
        
        db.session.commit()
        return libro, None

    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar libro: {e}")
        
        # Limpiar archivos en caso de error
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
            if metadata.get('cover_path') and os.path.exists(metadata['cover_path']):
                os.remove(metadata['cover_path'])
        except Exception as cleanup_error:
            print(f"Error en limpieza: {cleanup_error}")
            
        return None, f"Error en base de datos: {str(e)}"
