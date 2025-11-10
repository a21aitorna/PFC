import { Search, Plus, Star } from "lucide-react";
import { useLibrary } from "../hooks/libraryHook";

import Background from "../components/Background";
import Header from "../components/Header";
import InputText from "../components/InputText";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Library() {
  const {
    filteredBooks,
    search,
    setSearch,
    loading,
    sortOption,
    setSortOption,
    sortOrder,
    setSortOrder,
  } = useLibrary();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const mostrarHeader = true;

  return (
    <Background>
      {/* Header fijo */}
      {mostrarHeader && (
        <div className="fixed top-0 left-0 w-full z-50 h-16">
          <Header />
        </div>
      )}

      {/* Contenedor principal */}
      <div className="mt-16 mb-16 flex flex-col md:flex-row w-full max-w-7xl flex-1 px-6 py-8 
                      space-y-6 md:space-y-0 md:space-x-6 mx-auto h-auto">
        {/* Panel lateral izquierdo */}
        <aside className="md:w-1/4 space-y-6 flex-shrink-0">
          {/* Buscar */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Buscar</p>
            <div className="relative">
              <InputText
                placeholder="Usuarios y Librerías..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Ordenar */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Ordenar por</p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">-- Seleccionar --</option>
              <option value="date">Fecha</option>
              <option value="rating">Puntuación</option>
            </select>

            {sortOption && (
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            )}
          </div>
        </aside>

        {/* Sección principal */}
        <main className="flex-1 bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col 
                         max-h-[calc(100vh-8rem)]">
          {/* Header dentro de la card */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Mi Librería{" "}
              <span className="text-sm text-gray-500">({filteredBooks.length} libros)</span>
            </h2>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
              <Plus size={16} /> Añadir Libro
            </button>
          </div>

          {/* Loader o grid */}
          {loading ? (
            <p className="text-center text-gray-500 mt-10">Cargando libros...</p>
          ) : (
            <>
              {/* Contenido scrollable */}
              <div className="flex-1 overflow-y-auto pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentBooks.map((book, index) => (
                    <div
                      key={index}
                      className={`rounded-xl shadow-md p-4 bg-${book.color}-100 flex space-x-4 items-start`}
                    >
                      {book.cover && (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-20 h-28 object-cover rounded-md flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 flex flex-col text-sm text-gray-800">
                        <h3 className="font-semibold">{book.title}</h3>
                        <p className="text-gray-600">{book.author}</p>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < book.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                            />
                          ))}
                        </div>
                        <p className="text-gray-400 text-xs">{book.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`px-3 py-1 rounded-lg border ${
                        currentPage === i + 1
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer fijo */}
      <div className="fixed bottom-0 left-0 w-full z-50 h-16">
        <Footer />
      </div>
    </Background>
  );
}
