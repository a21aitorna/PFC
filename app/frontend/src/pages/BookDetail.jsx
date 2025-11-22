import { Star, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Card from "../components/Card";
import Header from "../components/Header";
import { useBookDetail } from "../hooks/detailBookHook";
import InputText from "../components/InputText";
import SendButton from "../components/SendButton";

export default function BookDetail() {
  const navigate = useNavigate();
  const {
    book,
    reviewText,
    setReviewText,
    reviews,
    rating,
    setRating,
    addReview
  } = useBookDetail({
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length)
    : 0;

  return (
    <Background>
      <Header />

      <Card className="mt-20 bg-transparent shadow-none w-full max-w-6xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* --- COLUMNA IZQUIERDA --- */}
          <Card className="w-full md:w-80 p-6 flex flex-col items-center gap-4 rounded-xl shadow-md flex-shrink-0 bg-white">
            <div className="w-full aspect-[3/4] bg-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-inner">
              <span className="text-white text-6xl">📖</span>
            </div>
            <h2 className="text-xl font-bold text-center w-full">{book.title}</h2>
            <p className="text-gray-600 text-center w-full">{book.author}</p>
            
            <div className="w-full border-t border-gray-100 my-2"></div>
            
            <p className="font-semibold text-center w-full text-sm text-gray-500 uppercase">
              Puntuación Promedio
            </p>
            
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill={i < averageRating ? "#fbbf24" : "none"} stroke="#fbbf24" />
              ))}
              {averageRating > 0 && (
                <span className="text-lg font-semibold ml-2 text-gray-700">
                  {averageRating.toFixed(1)} / 5.0
                </span>
              )}
            </div>
            
            <button
              onClick={() => {}}
              className="mt-4 w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-150 shadow-md"
            >
              Eliminar Libro
            </button>
          </Card>

          <div className="flex flex-col flex-1 w-full gap-4 min-w-0 max-h-[80vh]">

            {/* 1. CARD CUENTA RESEÑAS */}
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

            {/* 2. CARD AGREGAR RESEÑA */}
            <Card className="w-full p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Escribe tu reseña</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Tu experiencia ayuda a otros lectores.
              </p>

              <div className="mb-4">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={28}
                      className={`cursor-pointer transition-colors ${
                        i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                      }`}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
                </div>
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

            {/* 3. LISTA DE RESEÑAS */}
            <div className="w-full flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
              
              {reviews.map((review, index) => (
                <Card key={index} className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-100">
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
                      </div>

                      <div className="flex items-center gap-1 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                          />
                        ))}
                        <span className="text-xs font-bold text-gray-500 ml-2">
                          {review.rating.toFixed(1)} / 5.0
                        </span>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              
              {reviews.length === 0 && (
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
