import { URL_BACKEND } from "../config";

export const getReviewsByJuego = async (juegoId: number) => {
  const res = await fetch(`${URL_BACKEND}/reviews/${juegoId}`);
  if (!res.ok) {
    const text = await res.text();
    console.error("Error al obtener reseñas:", text);
    throw new Error("No se pudieron cargar las reseñas");
  }
  return await res.json();
};

export const createReview = async (juegoId: number, reviewData: { rating: number; comment: string }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuario no autenticado");

  const res = await fetch(`${URL_BACKEND}/reviews/${juegoId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Error al agregar reseña:", text);
    throw new Error("No se pudo agregar la reseña");
  }

  return await res.json();
};
