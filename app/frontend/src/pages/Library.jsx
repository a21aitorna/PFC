import { Search, Plus, Star, Download, Trash2 } from "lucide-react";
import { useLibrary } from "../hooks/libraryHook";
import { useUser } from "../context/userProvider";

import Background from "../components/Background";
import Header from "../components/Header";
import InputText from "../components/InputText";
import Footer from "../components/Footer";
import PanelCard from "../components/PanelCard";
import { useState, useRef } from "react";

export default function Library({ userId }) {
  const {
    filteredBooks,
    search,
    setSearch,
    loading,
    sortOption,
    setSortOption,
    sortOrder,
    setSortOrder,
    libraryName,
    uploadBook,
    userQuery,
    setUserQuery,
    userResults,
    goToUserLibrary
  } = useLibrary(userId);

  const { user, logout} = useUser();
  console.log("USER:", user);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const fileInputRef = useRef(null);

  const handleAddBookClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const result = await uploadBook(file);

    if (result.error) {
      alert(result.error);
    } else {
      alert(`Libro "${result.book.title}" subido correctamente`);
    }
  };

  return (
    <Background>
      {/* Header fijo */}
      <div className="fixed top-0 left-0 w-full z-50 h-16">
        <Header user={user} logout={logout} />
      </div>


      {/* Contenedor principal */}
      <div className="mt-20 mb-16 w-full max-w-7xl mx-auto px-6 flex flex-col space-y-6">

        {/* Panel Buscar usuarios/librerías */}
        <PanelCard title="Buscar usuarios o librerías" className="w-full text-left">
          <div className="relative mt-4">
            <InputText
              placeholder="Escribe un usuario o el nombre de una librería..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="pl-10 w-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* Resultados */}
          {userResults.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-xl shadow-inner p-3 space-y-2">
              {userResults.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition"
                  onClick={() => goToUserLibrary(u.id)}
                >
                  <img
                    src={u.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-800">{u.username}</p>
                    <p className="text-sm text-gray-500">{u.libraryName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {userQuery.length > 2 && userResults.length === 0 && (
            <p className="text-sm text-gray-500 mt-4">No se encontraron usuarios.</p>
          )}
        </PanelCard>

        {/* Área principal: sidebar + librería */}
        <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6">
          
          {/* Sidebar */}
          <aside className="md:w-1/4 space-y-6 flex-shrink-0">
            {/* Panel Buscar libros */}
            <PanelCard>
              <p className="text-sm font-medium text-gray-700 mb-2">Buscar</p>
              <div className="relative">
                <InputText
                  placeholder="Buscar libros..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </PanelCard>

            {/* Panel Ordenar libros */}
            <PanelCard>
              <p className="text-sm font-medium text-gray-700 mb-2">Ordenar por</p>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-1 text-sm"
              >
                <option value="">-- Seleccionar --</option>
                <option value="date">Fecha</option>
                <option value="rating">Puntuación</option>
              </select>

              {sortOption && (
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2 py-1 mt-2 text-sm"
                >
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              )}
            </PanelCard>
          </aside>

          {/* Contenedor principal */}
          <PanelCard className="flex-1 flex flex-col max-h-[calc(100vh-8rem)]">
            {/* Encabezado: Mi Librería + Añadir libro */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {libraryName || "ESTA MIERDA NO FUCA"}{" "}<span className="text-sm text-gray-500">
                
                  ({filteredBooks.length} libros)
                </span>
              </h2>

              <button
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                onClick={handleAddBookClick}
              >
                <Plus size={16} /> Añadir Libro
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".pdf,.epub"
              />
            </div>

            {/* Grid de libros o carga */}
            {loading ? (
              <p className="text-center text-gray-500 mt-10">Cargando libros...</p>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentBooks.map((book, index) => (
                      <div
                        key={index}
                        className="rounded-xl shadow-md p-4 bg-white/60 backdrop-blur-sm border border-white/20 flex space-x-4 items-start"
                      >
                        {book.cover && (
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-20 h-28 object-cover rounded-md flex-shrink-0"
                          />
                        )}

                        <div className="flex-1 text-sm text-gray-800">
                          <h3 className="font-semibold">{book.title}</h3>
                          <p className="text-gray-600">{book.author}</p>

                          {/* Rating */}
                          <div className="flex items-center space-x-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={i < (book.rating || 0) ? "currentColor" : "none"}
                                stroke="currentColor"
                              />
                            ))}
                          </div>

                          <div className="flex items-center gap-4 mt-2">
                            <button
                              className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-200"
                              title="Descargar"
                            >
                              <Download size={18} />
                            </button>

                            <button
                              className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-200"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <p className="text-gray-400 text-xs">
                            {book.created_at?.split("T")[0]}
                          </p>
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
          </PanelCard>
        </div>
      </div>

      {/* Footer fijo */}
      <div className="fixed bottom-0 left-0 w-full z-50 h-16">
        <Footer />
      </div>
    </Background>
  );
}
