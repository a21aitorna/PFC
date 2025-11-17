import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import { useUser } from "../context/userProvider";

export function useLibrary(routeUserId) {
  const { user, loading: userLoading } = useUser();
  const navigate = useNavigate();

  const userId = routeUserId || user?.id_user;

  const isOwner = user?.id_user === userId;

  const goToUserLibrary = (id) => {
    navigate(`/library/${id}`);
  };

  const [libraryName, setLibraryName] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [loadingUserSearch, setLoadingUserSearch] = useState(false);

  const ALLOWED_EXTENSIONS = ["pdf", "epub"];


  // Buscar usuarios/librerías
  useEffect(() => {
    if (userQuery.trim() === "") {
      setUserResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoadingUserSearch(true);
      try {
        const res = await axios.get(
          `${API_BASE}/users/search?q=${encodeURIComponent(userQuery)}`
        );
        setUserResults(res.data);
      } catch (err) {
        console.error("Error buscando usuarios:", err);
      } finally {
        setLoadingUserSearch(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [userQuery]);


  // Fetch nombre librería
  const fetchLibraryName = async (idParam) => {
    const idToFetch = idParam || user?.id_user;
    if (!idToFetch) return;

    try {
      const res = await axios.get(
        `${API_BASE}/library-name?id_user=${idToFetch}`
      );
      if (res.data?.library_name) {
        setLibraryName(res.data.library_name);
      } else {
        setLibraryName("Librería desconocida");
      }
    } 
    catch (error) {
      console.error("Error obteniendo el nombre de la librería");
      setLibraryName("Librería desconocida");
    }
  };

  // Fetch libros
  const fetchBooks = async () => {
    if (!userId) {
      setBooks([]);
      setFilteredBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/books/user/${userId}`);
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error("Error cargando libros:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading && userId) {
      // const usernameParam = isOwner ? undefined : userResults.find(u => u.id === userId)?.username;
      fetchLibraryName(userId);
      fetchBooks(userId);
      setSearch("");
    }
  }, [userId, userLoading]);

  // -------------------------------
  // Filtrado y ordenamiento
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
          return sortOrder === "asc"
            ? new Date(a.created_at) - new Date(b.created_at)
            : new Date(b.created_at) - new Date(a.created_at);
        } else if (sortOption === "rating") {
          return sortOrder === "asc"
            ? (a.rating || 0) - (b.rating || 0)
            : (b.rating || 0) - (a.rating || 0);
        }
        return 0;
      });
    }

    setFilteredBooks(filtered);
  }, [books, search, sortOption, sortOrder]);

  // Archivos permitidos
  const allowedFile = (filename) => {
    if (!filename || typeof filename !== "string") return false;
    const ext = filename.split(".").pop().toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
  };

  // Subir libro
  const uploadBook = async (file) => {
    if (!isOwner) return { error: "No puedes subir libros de otra biblioteca" };
    if (!file) return { error: "No se seleccionó archivo" };
    if (!user?.id_user) return { error: "Usuario no logueado" };
    if (!allowedFile(file.name)) return { error: "Formato no permitido" };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user.id_user);

    try {
      const res = await axios.post(`${API_BASE}/books/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploaded = res.data.book;

      let normalizedCover = null;
      if (uploaded.cover) {
        const coverFileName = uploaded.cover.split("/").pop();
        normalizedCover = `${API_BASE}/books/cover/${coverFileName}`;
      }

      const normalizedBook = {
        ...uploaded,
        cover: normalizedCover,
      };

      setBooks((prev) => [normalizedBook, ...prev]);
      setFilteredBooks((prev) => [normalizedBook, ...prev]);

      return { success: true, book: normalizedBook };
    } catch (err) {
      console.error("Error subiendo libro:", err);
      return { error: err.response?.data?.error || "Error al subir libro" };
    }
  };

  // Borrar libro
  const deleteBook = async (bookId) => {
    if (!isOwner) return { error: "No puedes borrar libros de otra biblioteca" };
    if (!user?.id_user) return { error: "Usuario no logueado" };

    try {
      const res = await axios.delete(
        `${API_BASE}/books/delete/user/${user.id_user}/book/${bookId}`
      );
      if (res.status === 200) {
        setBooks((prev) => prev.filter((b) => b.id_book !== bookId));
        setFilteredBooks((prev) => prev.filter((b) => b.id_book !== bookId));
        
        return { success: true };
      }
      return { error: res.data?.msg || "Error eliminando libro" };
    } catch (err) {
      console.error(err);
      return { error: "Error eliminando libro" };
    }
  };

  // Descargar libro
  const downloadBook = (bookId) => {
    if (!bookId) return;
    window.open(`${API_BASE}/books/download/${bookId}`, "_blank");
  };

  // Volver a la librería principal
  const goBackToLibrary = () => {
    if (!user?.id_user) return;
    setUserQuery("");
    setSearch("");
    navigate("/library");
  };

  const selectLibrary = (id) => {
    setUserQuery("");
    setUserResults([]);
    goToUserLibrary(id);
  }

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
    libraryName,
    uploadBook,
    fetchBooks,
    userQuery,
    setUserQuery,
    userResults,
    loadingUserSearch,
    goToUserLibrary,
    deleteBook,
    downloadBook,
    isOwner,
    goBackToLibrary,
    selectLibrary
  };
}
