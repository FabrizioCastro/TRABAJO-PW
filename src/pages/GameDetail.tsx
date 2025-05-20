// src/pages/GameDetail.tsx
import { useParams } from 'react-router-dom'
import { getJuegos } from '../data/games'
import type { Game, Review } from '../data/games'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function GameDetail() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [juego, setJuego] = useState<Game | undefined>(undefined)
  const [hasPurchased, setHasPurchased] = useState(false)
  const [review, setReview] = useState({
    rating: 5,
    comment: ''
  })

  useEffect(() => {
    const juegosActualizados = getJuegos()
    const foundGame = juegosActualizados.find(j => j.id === Number(id))
    setJuego(foundGame)

    // Check if user has purchased this game
    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]")
    const userPurchases = historial.some((orden: any) => 
      orden.juegos.some((gameName: string) => gameName === foundGame?.nombre)
    )
    setHasPurchased(userPurchases)
  }, [id])

  if (!juego) return <p>Juego no encontrado.</p>

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated || !user) {
      alert("Debes iniciar sesión para dejar una reseña")
      return
    }

    const newReview: Review = {
      userId: user.id,
      username: user.username,
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString()
    }

    // Update game reviews
    const updatedGame = {
      ...juego,
      reviews: [...juego.reviews, newReview]
    }
    
    // Update games array
    const juegosActualizados = getJuegos()
    const gameIndex = juegosActualizados.findIndex((g: Game) => g.id === juego.id)
    juegosActualizados[gameIndex] = updatedGame
    localStorage.setItem("juegos", JSON.stringify(juegosActualizados))
    setJuego(updatedGame)

    // Reset form
    setReview({ rating: 5, comment: '' })
  }

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h2>{juego.nombre}</h2>
      <img src={juego.imagen} alt={juego.nombre} style={{ maxWidth: '300px', borderRadius: '12px' }} />
      <p><strong>Descripción:</strong> {juego.descripcion}</p>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      {juego.descuento ? (
        <div className="precio-container">
          <p><strong>Precio original:</strong> ${juego.precio.toFixed(2)}</p>
          <p><strong>Precio con descuento:</strong> ${(juego.precio * (1 - juego.descuento / 100)).toFixed(2)}</p>
          <span className="descuento-badge">-{juego.descuento}%</span>
        </div>
      ) : (
        <p><strong>Precio:</strong> ${juego.precio.toFixed(2)}</p>
      )}
      <p><strong>Valoración:</strong> ⭐ {juego.valoracion}</p>
      {juego.oferta && <p style={{ color: 'orange' }}>🔥 En oferta</p>}

      {/* Reviews Section */}
      <div className="reviews-section" style={{ marginTop: '30px' }}>
        <h3>Reseñas</h3>
        
        {/* Review Form */}
        {hasPurchased && isAuthenticated && (
          <form onSubmit={handleReviewSubmit} style={{ marginBottom: '20px' }}>
            <h4>Deja tu reseña</h4>
            <div style={{ marginBottom: '10px' }}>
              <label>Calificación: </label>
              <select 
                value={review.rating} 
                onChange={(e) => setReview({...review, rating: Number(e.target.value)})}
                style={{ marginLeft: '10px' }}
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} ⭐</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <textarea
                value={review.comment}
                onChange={(e) => setReview({...review, comment: e.target.value})}
                placeholder="Escribe tu reseña aquí..."
                style={{ width: '100%', minHeight: '100px', padding: '10px' }}
                required
              />
            </div>
            <button type="submit" style={{ padding: '8px 16px' }}>Enviar Reseña</button>
          </form>
        )}

        {/* Display Reviews */}
        <div className="reviews-list">
          {juego.reviews.length === 0 ? (
            <p>No hay reseñas aún. ¡Sé el primero en opinar!</p>
          ) : (
            juego.reviews.map((review, index) => (
              <div key={index} style={{ 
                border: '1px solid #444', 
                padding: '15px', 
                marginBottom: '10px',
                borderRadius: '8px'
              }}>
                <p><strong>{review.username}</strong> - {review.rating} ⭐</p>
                <p>{review.comment}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default GameDetail
