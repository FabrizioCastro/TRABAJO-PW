// src/pages/GameDetail.tsx
import { useParams } from 'react-router-dom'
import { getJuegos } from '../data/games'
import type { Game, Review } from '../data/games'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { obtenerJuegoPorId } from '../services/juegosService'
import { createReview, getReviewsByJuego } from '../services/reviewService'

function GameDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [juego, setJuego] = useState<Game | undefined>(undefined)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [showTrailerModal, setShowTrailerModal] = useState(false)
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      try {
        const game = await obtenerJuegoPorId(Number(id))
        setJuego(game)

        const reviewsData = await getReviewsByJuego(Number(id))
        setReviews(reviewsData)

        if (user) {
          const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]")
          const comprado = historial.some((orden: any) =>
            orden.userId === user.id && orden.juegos.includes(game.nombre)
          )
          setHasPurchased(comprado)
        }
      } catch (error) {
        console.error("Error al cargar juego o reseñas:", error)
      }
    }

    fetchData()
  }, [id, user])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !juego) return

    try {
      await createReview(juego.id, {
        rating: reviewForm.rating,
        comment: reviewForm.comment
      })

      // Volver a cargar las reseñas del juego después de enviar
      const updatedReviews = await getReviewsByJuego(juego.id)
      setReviews(updatedReviews)
      setReviewForm({ rating: 5, comment: '' })
    } catch (error) {
      console.error("Error al enviar la reseña:", error)
    }
  }

  if (!juego) return <p className="text-white">Juego no encontrado.</p>
  return (
    <div className="container text-white mt-5">
      <div className="position-relative mb-5 rounded" style={{ backgroundImage: `url(${juego.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '320px', overflow: 'hidden' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div className="position-absolute bottom-0 start-0 p-4 text-white" style={{ zIndex: 2 }}>
          <h2 className="display-5 fw-bold">{juego.nombre}</h2>
          <p className="mb-0">{juego.categoria} | {juego.plataforma}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-white">Tráiler</h4>
        <div className="mb-4" style={{ cursor: 'pointer', maxWidth: '1000px' }} onClick={() => setShowTrailerModal(true)}>
          {juego.trailer?.endsWith(".mp4") ? (
            <video className="rounded shadow" style={{ width: '100%' }} muted playsInline preload="metadata">
              <source src={`/${juego.trailer}`} type="video/mp4" />
            </video>
          ) : juego.trailer ? (
            <div style={{ aspectRatio: '16/9', width: '100%' }}>
              <iframe src={juego.trailer.includes("embed") ? juego.trailer : juego.trailer.replace("watch?v=", "embed/")} title={`Tráiler ${juego.nombre}`} allowFullScreen style={{ width: '100%', height: '100%', border: 0 }}></iframe>
            </div>
          ) : (
            <p className="text-muted">No hay tráiler disponible para este juego.</p>
          )}
        </div>

        <h5 className="text-white">Imágenes del juego</h5>
        {juego.imagenes && juego.imagenes.length > 0 ? (
          <div className="row g-3 mb-4">
            {juego.imagenes.map((img, idx) => (
              <div className="col-12 col-sm-6 col-md-4" key={idx}>
                <div className="ratio ratio-16x9 overflow-hidden rounded shadow" style={{ maxHeight: '220px' }}>
                  <img
                    src={img.startsWith('http') ? img : `/${img.replace(/^public\//, '')}`}
                    className="w-100 h-100 object-fit-cover"
                    alt={`Imagen referencia ${idx + 1}`}
                    onClick={() => setImagenSeleccionada(img)}
                    style={{ cursor: 'pointer' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "https://via.placeholder.com/300x180?text=Imagen+no+disponible"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No hay imágenes disponibles para este juego.</p>
        )}
      </div>

      <p><strong>Descripción:</strong> {juego.descripcion}</p>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>

      {juego.descuento ? (
        <div className="mb-3">
          <p><strong>Precio original:</strong> ${juego.precio.toFixed(2)}</p>
          <p><strong>Con descuento:</strong> ${(juego.precio * (1 - juego.descuento / 100)).toFixed(2)}</p>
          <span className="badge bg-danger">-{juego.descuento}%</span>
        </div>
      ) : (
        <p><strong>Precio:</strong> ${juego.precio.toFixed(2)}</p>
      )}

      <p><strong>Valoración:</strong> ⭐ {juego.valoracion}</p>
      {juego.oferta && <p className="text-warning">🔥 En oferta</p>}

      <div className="mt-5">
        <h3>Reseñas</h3>

        {hasPurchased && isAuthenticated ? (
          <form onSubmit={handleReviewSubmit} className="mb-4">
            <h5>Deja tu reseña</h5>
            <div className="alert alert-info p-3 mb-3">
              <label className="form-label d-block">Calificación</label>
              <div className="mb-3 fs-4">
                {[1, 2, 3, 4, 5].map(num => (
                  <span
                    key={num}
                    onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                    style={{ cursor: 'pointer', color: num <= reviewForm.rating ? '#ffc107' : '#ccc', transition: 'color 0.2s' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <label className="form-label">Comentario</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Escribe tu reseña aquí..."
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Enviar Reseña</button>
          </form>
        ) : (
          <div className="alert alert-warning">
            {isAuthenticated ? "Solo puedes dejar una reseña si compraste este juego." : "Debes iniciar sesión para dejar una reseña."}
          </div>
        )}

        <div className="mt-3">
          {reviews.length === 0 ? (
            <div className="alert alert-info">
              No hay reseñas aún. <strong>¡Sé el primero!</strong>
            </div>
          ) : (
            reviews.map((rev, i) => (
              <div key={i} className="border rounded p-3 mb-3 bg-dark text-white">
                <strong>{rev.username}</strong> - {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                <p>{rev.comment}</p>
                <small className="text-secondary">{new Date(rev.date).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )

}

export default GameDetail