
import { useState } from "react";

export function useBookDetail(initialBook) {
  const [book] = useState(initialBook);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    { user: "usuario1", date: "25 de enero de 2024", rating: 5, comment: "Fascinante y mágico. Altamente recomendado." }
  ]);
  const [rating, setRating] = useState(5);

  const addReview = () => {
    if (!reviewText) return;
    setReviews([
      ...reviews,
      { user: "Tú", date: new Date().toLocaleDateString(), rating, comment: reviewText }
    ]);
    setReviewText("");
  };

  return {
    book,
    reviewText,
    setReviewText,
    reviews,
    rating,
    setRating,
    addReview
  };
}
