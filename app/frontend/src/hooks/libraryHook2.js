import { useState, useEffect } from "react";

export function useLibrary() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState(""); // "date" o "rating"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"

  useEffect(() => {
    // Simulación de carga desde API
    setTimeout(() => {
      const mockBooks = [
        {
          title: "Cien años de soledad",
          author: "Gabriel García Márquez",
          rating: 5,
          date: "15/7/2024",
          color: "amber",
          cover: "/covers/cien-anos.jpg"
        },
        {
          title: "Don Quijote de la Mancha",
          author: "Miguel de Cervantes",
          rating: 5,
          date: "20/2/2024",
          color: "red",
          cover: "/covers/don-quijote.jpg"
        },
        {
          title: "1984",
          author: "George Orwell",
          rating: 4,
          date: "10/9/2024",
          color: "gray",
          cover: "/covers/1984.jpg"
        },
        {
          title: "El principito",
          author: "Antoine de Saint-Exupéry",
          rating: 5,
          date: "25/3/2024",
          color: "blue",
          cover: "/covers/principito.jpg"
        },
        {
          title: "Rayuela",
          author: "Julio Cortázar",
          rating: 5,
          date: "5/4/2024",
          color: "green",
          cover: "/covers/rayuela.jpg"
        },
        {
          title: "El amor en los tiempos del cólera",
          author: "Gabriel García Márquez",
          rating: 5,
          date: "8/5/2024",
          color: "pink",
          cover: "/covers/amor.jpg"
        },
        {
          title: "Ficciones",
          author: "Jorge Luis Borges",
          rating: 5,
          date: "15/7/2024",
          color: "violet",
          cover: "/covers/ficciones.jpg"
        },
        {
          title: "La sombra del viento",
          author: "Carlos Ruiz Zafón",
          rating: 5,
          date: "12/5/2024",
          color: "indigo",
          cover: "/covers/sombra.jpg"
        },
        {
          title: "La sombra del viento",
          author: "Carlos Ruiz Zafón",
          rating: 5,
          date: "12/5/2024",
          color: "indigo",
          cover: "/covers/sombra.jpg"
        },
        {
          title: "La sombra del viento",
          author: "Carlos Ruiz Zafón",
          rating: 5,
          date: "12/5/2024",
          color: "indigo",
          cover: "/covers/sombra.jpg"
        },
        {
          title: "La sombra del viento",
          author: "Carlos Ruiz Zafón",
          rating: 5,
          date: "12/5/2024",
          color: "indigo",
          cover: "/covers/sombra.jpg"
        }
      ];
      setBooks(mockBooks);
      setFilteredBooks(mockBooks);
      setLoading(false);
    }, 1000);
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
  };
}
