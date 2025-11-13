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

  // -----------------------
  // Cargar libros del usuario
  // -----------------------
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

  // -----------------------
  // Cargar libros automáticamente al entrar o cambiar de usuario
  // -----------------------
  useEffect(() => {
    if (!userLoading && user?.id_user) {
      fetchBooks();
    }
  }, [user?.id_user, userLoading]);

  // -----------------------
  // Filtrar y ordenar libros
  // -----------------------
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

  // -----------------------
  // Subir libro
  // -----------------------
  const uploadBook = async (file) => {
    if (!file) return { error: "No se seleccionó ningún archivo" };
    if (!user?.id_user) return { error: "Usuario no logueado" };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user.id_user);

    try {
      const res = await axios.post(`${API_BASE}/books/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setBooks((prev) => [res.data.book, ...prev]);
      setFilteredBooks((prev) => [res.data.book, ...prev]);

      return { success: true, book: res.data.book };
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
