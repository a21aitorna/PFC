import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import { useUser } from "../context/userProvider";

export function useLibrary() {
  
  const { user, loading: userLoading } = useUser();
  
  const navigate = useNavigate();

  const goToUserLibrary = (userId) => {
    navigate(`/library/${userId}`);
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

  // Verifica el tipo de  archivo
  const allowedFile = (filename) => {
    if (typeof filename !== "string") return false;
    if (!filename.includes(".")) return false;
    const ext = filename.split(".").pop().toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
  };

  // Fetch para obtener el nombre de la librería
  const fetchLibraryName = async () => {
    if (!user?.username) return;

    try {
      const res = await axios.get(`${API_BASE}/library-name?username=${encodeURIComponent(user.username)}`);
      if(res.data?.library_name) {
        setLibraryName(res.data.library_name);
      }

    } catch (error) {
      console.error("Error obteniendo el nombre de la librería")
    }

  }

  // Cargar nombre de librería también cuando user está listo
  useEffect(() => {
    if (!userLoading && user?.username) {
      fetchLibraryName();
    }
  }, [user?.username, userLoading]);

  // Fetch para obtener los libros del usuario
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
  }, [search, books, sortOption, sortOrder]);


  // Subir un libro
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

      const uploaded = res.data.book;
      const coverFileName = uploaded.cover
        ? uploaded.cover.split("/").pop()
        : null;

      const normalizedBook = {
        ...uploaded,
        cover: coverFileName
          ? `${API_BASE}/books/cover/${coverFileName}`
          : null,
      };

      setBooks((prev) => [normalizedBook, ...prev]);
      setFilteredBooks((prev) => [normalizedBook, ...prev]);

      return { success: true, book: normalizedBook };
    } catch (err) {
      console.error("Error subiendo libro:", err);
      return { error: err.response?.data?.error || "Error al subir el libro" };
    }
  };

  const deleteBook = async (bookId) => {
  if (!user?.id_user) return { error: "Usuario no logueado" };

  try {
    const res = await axios.delete(
      `${API_BASE}/books/delete/user/${user.id_user}/book/${bookId}`
    );

    // 🔥 Si el borrado fue exitoso → actualiza el estado
    if (res.data && res.data.code === "4000") { // AJUSTA segun tu backend
      setBooks(prev => prev.filter(b => b.id_book !== bookId));
      setFilteredBooks(prev => prev.filter(b => b.id_book !== bookId));
      return { success: true };
    }

    return { error: res.data?.msg || "Error eliminando el libro" };

  } catch (err) {
    console.error("🔥 Error eliminando libro:", err);
    return { error: "Error eliminando el libro" };
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
    libraryName,
    uploadBook,
    fetchBooks,
    userQuery,
    setUserQuery,
    userResults,
    loadingUserSearch,
    goToUserLibrary,
    deleteBook
  };
}
