import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";
import { useUser } from "../context/userProvider";

export function useLibrary() {
  const { user, loading: userLoading } = useUser();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const ALLOWED_EXTENSIONS = ['pdf', 'epub'];

  //Verificar tipo de archivos
  const allowedFile = (filename) => {
    // Validar que filename sea un string
    if (typeof filename !== 'string') return false;
    
    // Debe contener un punto
    if (!filename.includes('.')) return false;

    // Extraer la extensión
    const ext = filename.split('.').pop().toLowerCase();

    // Revisar si está permitida
    return ALLOWED_EXTENSIONS.includes(ext);
  };

  // -------------------------------
  // FETCH BOOKS DEL USUARIO
  // -------------------------------
  const fetchBooks = async () => {
    if (!user?.id_user) {
      setBooks([]);
      setFilteredBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/books/user/${user.id_user}`);
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error("Error cargando libros:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading && user?.id_user) {
      fetchBooks();
    }
  }, [user?.id_user, userLoading]);

  // -------------------------------
  // FILTRADO Y ORDENAMIENTO
  // -------------------------------
  useEffect(() => {
    let filtered = [...books];

    if (search) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOption) {
      filtered.sort((a, b) => {
        if (sortOption === "date") {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortOption === "rating") {
          return sortOrder === "asc"
            ? (a.rating || 0) - (b.rating || 0)
            : (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
    }

    setFilteredBooks(filtered);
  }, [search, books, sortOption, sortOrder]);

  // -------------------------------
  // SUBIR LIBRO
  // -------------------------------
  const uploadBook = async (file) => {
    if (!file) return { error: "No se seleccionó ningún archivo" };
    if (!user?.id_user) return { error: "Usuario no logueado" };
    if (!allowedFile(file.name)) return { error: "Formato no permitido" };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user.id_user);

    try {
      const res = await axios.post(`${API_BASE}/books/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Normalizar la portada para que cargue desde el backend inmediatamente
      const uploaded = res.data.book;
      const coverFileName = uploaded.cover ? uploaded.cover.split("/").pop() : null;

      const normalizedBook = {
        ...uploaded,
        cover: coverFileName ? `${API_BASE}/books/cover/${coverFileName}` : null,
      };

      // Actualizamos el estado para mostrar inmediatamente
      setBooks((prev) => [normalizedBook, ...prev]);
      setFilteredBooks((prev) => [normalizedBook, ...prev]);

      return { success: true, book: normalizedBook };

    } catch (err) {
      console.error("Error subiendo libro:", err);
      return { error: err.response?.data?.error || "Error al subir el libro" };
    }
  };

  return {
    books,
    filteredBooks,
    loading,
    search,
    setSearch,
    sortOption,
    setSortOption,
    sortOrder,
    setSortOrder,
    uploadBook,
    fetchBooks,
  };
}
