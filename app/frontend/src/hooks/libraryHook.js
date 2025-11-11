import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";

export function useLibrary() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState(""); // "date" o "rating"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"

  useEffect(() => {
    // Carga inicial desde backend
    setLoading(true);
    axios.get(`${API_BASE}/books/list`) // Endpoint opcional para listar libros
      .then(res => {
        setBooks(res.data);
        setFilteredBooks(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = books;

    if (search) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOption) {
      filtered = filtered.sort((a, b) => {
        if (sortOption === "date") {
          const dateA = new Date(a.date.split("/").reverse().join("/"));
          const dateB = new Date(b.date.split("/").reverse().join("/"));
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortOption === "rating") {
          return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
      });
    }

    setFilteredBooks(filtered);
  }, [search, books, sortOption, sortOrder]);

  // ----------------------------
  // Nueva función para subir libros
  // ----------------------------
  const uploadBook = async (file, userId) => {
    if (!file) return { error: "No se seleccionó ningún archivo" };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      const res = await axios.post(`${API_BASE}/books/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // Agregamos el libro recién subido al estado
      setBooks(prev => [res.data.book, ...prev]);
      setFilteredBooks(prev => [res.data.book, ...prev]);

      return { success: true, book: res.data.book };
    } catch (err) {
      console.error(err);
      return { error: err.response?.data?.error || "Error al subir el libro" };
    }
  };

  return {
    books,
    filteredBooks,
    search,
    setSearch,
    loading,
    sortOption,
    setSortOption,
    sortOrder,
    setSortOrder,
    uploadBook, // <-- nueva función
  };
}
