import { useNavigate, useParams } from "react-router-dom";
import { Star, User } from "lucide-react";
import Background from "../components/Background";
import Card from "../components/Card";
import Header from "../components/Header";
import InputText from "../components/InputText";
import SendButton from "../components/SendButton";
import StarRating from "../components/StarRating"; // Componente para medias estrellas
import { useBookDetail } from "../hooks/detailBookHook";

export default function BookDetail() {
  const navigate = useNavigate();
  const { id_book } = useParams(); // Tomamos el id de la ruta
  const {
    book,
    reviews,
    reviewText,
    setReviewText,
    rating,
    setRating,
    addReview,
    deleteReview,
    loading,
  } = useBookDetail(id_book);

  const averageRating = book?.rating || 0;

  if (loading || !book) {
    return (
      <Background>
        <div className="text-center py-20 text-gray-500">Cargando libro...</div>
      </Background>
    );
  }

  return (
    <Background>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 mt-20 relative">
        <button
          onClick={() => navigate("/library")}
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 
                    rounded-lg shadow-sm hover:bg-gray-100 transition relative z-10"
        >
          Volver a la librería
        </button>
      </div>

      <Card className="mt-2 bg-transparent shadow-none w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* --- COLUMNA IZQUIERDA --- */}
          <Card className="w-full md:w-80 p-6 flex flex-col items-center gap-4 rounded-xl shadow-md flex-shrink-0 bg-white">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full aspect-[3/4] rounded-lg shadow-inner object-cover mb-2"
            />
            <h2 className="text-xl font-bold text-center w-full">{book.title}</h2>
            <p className="text-gray-600 text-center w-full">{book.author}</p>

            <div className="w-full border-t border-gray-100 my-2"></div>

            <p className="font-semibold text-center w-full text-sm text-gray-500 uppercase">
              Puntuación Promedio
            </p>

            <StarRating rating={averageRating} readonly size={24}/>

            <button
              onClick={() => {}}
              className="mt-4 w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-150 shadow-md"
            >
              Eliminar Libro
            </button>
          </Card>

          <div className="flex flex-col flex-1 w-full gap-4 min-w-0 max-h-[80vh]">
            {/* CARD 1: Cuenta reseñas */}
            <Card className="w-full p-6 bg-white rounded-lg shadow-md">
              <div className="flex flex-col items-start justify-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Star size={24} className="fill-yellow-400 text-yellow-400" />
                  Reseñas
                  <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200 ml-1">
                    {reviews.length}
                  </span>
                </h2>
                <p className="text-gray-500 text-sm">
                  Comparte tu opinión sobre este libro
                </p>
              </div>
            </Card>

            {/* CARD 2: Agregar reseña */}
            <Card className="w-full p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Escribe tu reseña</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Tu experiencia ayuda a otros lectores.
              </p>

              <div className="mb-4">
                <StarRating rating={rating} setRating={setRating} size={28}/>
              </div>

              <InputText
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Escribe aquí tu opinión..."
                className="w-full mb-4"
                rows={4}
              />

              <div className="flex justify-end w-full">
                <SendButton onClick={addReview} className="px-6">
                  Publicar Reseña
                </SendButton>
              </div>
            </Card>

            {/* CARD 3: Lista de reseñas */}
            <div className="w-full flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
              {Array.isArray(reviews) && reviews.map((review) => (
                <Card key={review.id_review} className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white">
                      <User size={24} />
                    </div>

                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900">{review.user || "usuario"}</h4>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <button
                          onClick={() => deleteReview(review.id_review)}
                          className="text-red-500 text-xs"
                        >
                          Eliminar
                        </button>
                      </div>

                      <StarRating rating={review.rating} readonly size={24}/>

                      <p className="text-gray-700 text-sm leading-relaxed mt-1">{review.text}</p>
                    </div>
                  </div>
                </Card>
              ))}

              {(!reviews || reviews.length === 0) && (
                <div className="text-center py-10 text-gray-400">
                  No hay opiniones todavía. ¡Sé el primero en dejar una reseña!
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Background>
  );
}
