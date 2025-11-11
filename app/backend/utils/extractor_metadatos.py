import os
import io
from ebooklib import epub
from PIL import Image
import fitz

COVERS_PATH = os.path.join('uploads', 'covers')
DEFAULT_COVER = os.path.join(COVERS_PATH, 'default_cover.jpg')
ITEM_IMAGE = 9

def normalize_category(cat_name: str) -> str:
    return cat_name.strip().capitalize()

def save_cover_image(image_data, output_path, convert_to_png=True):
    """Guardar la imagen como PNG si convert_to_png es True, sino la guarda tal cual."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    try:
        if convert_to_png:
            image = Image.open(io.BytesIO(image_data))
            output_path = os.path.splitext(output_path)[0] + '.png'
            image.save(output_path, 'PNG')
        else:
            with open(output_path, "wb") as f:
                f.write(image_data)
        return output_path
    except Exception as e:
        print(f"No se pudo guardar la portada: {e}")
        return DEFAULT_COVER
    
# --- EPUB ---
def extract_epub_metadata(book_path, book_filename):
    if not os.path.exists(book_path):
        print(f"Archivo no encontrado: {book_path}")
        return None

    try:
        book = epub.read_epub(book_path)

        # --- Título y autor ---
        title = book.get_metadata('DC', 'title')[0][0] if book.get_metadata('DC', 'title') else 'Sin título'
        author = book.get_metadata('DC', 'creator')[0][0] if book.get_metadata('DC', 'creator') else 'Desconocido'

        # --- Categorías ---
        subjects = book.get_metadata('DC', 'subject')
        categories = [normalize_category(s[0]) for s in subjects if s and s[0].strip()] if subjects else []

        # --- Portada ---
        os.makedirs(COVERS_PATH, exist_ok=True)
        cover_path = DEFAULT_COVER
        cover_found = False

        # Función auxiliar para guardar imagen y actualizar cover_path
        def try_save_cover(item):
            nonlocal cover_path, cover_found
            cover_filename = f"{os.path.splitext(book_filename)[0]}_cover"
            full_path = os.path.join(COVERS_PATH, cover_filename)
            saved_path = save_cover_image(item.get_content(), full_path, convert_to_png=True)
            if saved_path:
                cover_path = saved_path
                cover_found = True

        # --- MÉTODO 1: Rutas conocidas ---
        known_paths = [
            'Images/cover.jpg', '../Images/cover.jpg', 'cover.jpg',
            'OEBPS/Images/cover.jpg', 'OEBPS/cover.jpg', 'text/Images/cover.jpg'
        ]
        for href in known_paths:
            try:
                item = book.get_item_with_href(href)
                if item:
                    try_save_cover(item)
                    if cover_found: break
            except Exception:
                continue

        # --- MÉTODO 2: Buscar cualquier imagen que contenga "cover" ---
        # if not cover_found:
        #     for item in book.get_items():
        #         if getattr(item, 'get_type', lambda: None)() == ITEM_IMAGE:
        #             if hasattr(item, 'file_name') and 'cover' in item.file_name.lower():
        #                 try_save_cover(item)
        #                 if cover_found: break

        # --- MÉTODO 3: Buscar en el guide ---
        # if not cover_found and hasattr(book, 'guide'):
        #     try:
        #         for guide_ref in book.guide:
        #             if isinstance(guide_ref, dict) and guide_ref.get('type') == 'cover':
        #                 cover_href = guide_ref.get('href')
        #                 if cover_href:
        #                     item = book.get_item_with_href(cover_href)
        #                     if item:
        #                         try_save_cover(item)
        #                         if cover_found: break
        #                     else:
        #                         # Si apunta a XHTML, extraer la primera imagen de ahí
        #                         content_item = book.get_item_with_href(cover_href)
        #                         if content_item:
        #                             content = content_item.get_content().decode('utf-8')
        #                             import re
        #                             match = re.search(r'src="([^"]+)"', content)
        #                             if match:
        #                                 img_href = match.group(1).replace('../', '').replace('./', '')
        #                                 img_item = book.get_item_with_href(img_href)
        #                                 if img_item:
        #                                     try_save_cover(img_item)
        #                                     if cover_found: break
        #     except Exception:
        #         pass

        # --- MÉTODO 4: Primera imagen como último recurso ---
        # if not cover_found:
        #     for item in book.get_items():
        #         if getattr(item, 'get_type', lambda: None)() == ITEM_IMAGE:
        #             try_save_cover(item)
        #             if cover_found: break

        # if not cover_found:
        #     print("No se encontró ninguna portada en el EPUB, se usará la portada por defecto.")

        return {
            'title': title,
            'author': author,
            'categories': categories,
            'cover_path': cover_path
        }

    except Exception as e:
        print(f"Error procesando EPUB: {e}")
        import traceback
        traceback.print_exc()
        return None

# --- PDF ---
def extract_pdf_metadata(book_path, book_filename):
    if not os.path.exists(book_path):
        print(f"Archivo no encontrado: {book_path}")
        return None

    try:
        doc = fitz.open(book_path)

        # Título y autor
        metadata = doc.metadata
        title = metadata.get('title', '') or 'Sin título'
        author = metadata.get('author', '') or 'Desconocido'
        categories = []  # PDF no suele tener categorías

        # Portada: primera página como imagen
        cover_path = DEFAULT_COVER
        if doc.page_count > 0:
            page = doc.load_page(0)
            pix = page.get_pixmap()
            image_data = pix.tobytes("png")
            cover_path = save_cover_image(
                image_data,
                os.path.join(COVERS_PATH, f"{os.path.splitext(book_filename)[0]}_cover")
            )

        doc.close()

        return {
            'title': title,
            'author': author,
            'categories': categories,
            'cover_path': cover_path
        }

    except Exception as e:
        print(f"Error procesando PDF: {e}")
        return None


def extract_metadata(book_path, book_filename):
    """Función principal para extraer metadatos en epub y pdf"""
    ext = os.path.splitext(book_filename)[1].lower()
    if ext == '.epub':
        return extract_epub_metadata(book_path, book_filename)
    elif ext == '.pdf':
        return extract_pdf_metadata(book_path, book_filename)
    else:
        raise ValueError("Formato no permitido")
