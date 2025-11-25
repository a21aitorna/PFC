import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";

export function useBookDetail(id_book) {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // Traer detalle del libro
  const fetchBookDetail = async () => {
    try {
      const res = await axios.get(`${API_BASE}/books/detail-book/${id_book}`);
      setBook(res.data);
      setRating(res.data.rating); // rating promedio
    } catch (error) {
      console.error("Error cargando detalle del libro: ", error);
    }
  };

  // Traer reseñas del libro
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/books/book/${id_book}/reviews`);
      const data = Array.isArray(res.data.reviews) ? res.data.reviews : [];

      const formattedReviews = data.map(r => ({
        id_review: r.id_review,
        text: r.review_text,
        user: r.review_user_username,
        rating: r.book_rating / 2, // convertir de 0-10 a 0-5
        date: new Date(r.creation_date).toLocaleDateString(),
      }));

      setReviews(formattedReviews);
    } catch (error) {
      console.error("Error cargando reseñas: ", error);
      setReviews([]);
    }
  };

  // Agregar una nueva reseña
  const addReview = async () => {
    if (!reviewText || rating === 0) return;

    try {
      await axios.post(`${API_BASE}/books/book/${id_book}/review`, {
        user_id: 1, // Cambiar según usuario logueado
        review_text: reviewText,
        rating: rating 
      });

      setReviewText("");
      await fetchReviews(); // refrescar lista
      await fetchBookDetail(); // refrescar rating promedio
    } catch (error) {
      console.error("Error agregando reseña: ", error);
    }
  };

  // Eliminar reseña
  const deleteReview = async (id_review) => {
    try {
      await axios.delete(`${API_BASE}/books/review/${id_review}`);
      await fetchReviews(); // refrescar lista
      await fetchBookDetail(); // refrescar rating promedio
    } catch (error) {
      console.error("Error eliminando reseña: ", error);
    }
  };

  useEffect(() => {
    if (!id_book) return;
    setLoading(true);
    Promise.all([fetchBookDetail(), fetchReviews()]).finally(() => setLoading(false));
  }, [id_book]);

  return {
    book,
    reviews,
    reviewText,
    setReviewText,
    rating,
    setRating,
    addReview,
    deleteReview,
    loading,
  };
}
