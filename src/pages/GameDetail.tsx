// src/pages/GameDetail.tsx
import { useParams } from 'react-router-dom'
import { juegos } from '../data/games'

function GameDetail() {
  const { id } = useParams()
  const juego = juegos.find(j => j.id === Number(id))

  if (!juego) return <p>Juego no encontrado.</p>

  return (
    <div style={{ color: 'white' }}>
      <h2>{juego.nombre}</h2>
      <img src={juego.imagen} alt={juego.nombre} style={{ maxWidth: '300px', borderRadius: '12px' }} />
      <p><strong>Descripción:</strong> {juego.descripcion}</p>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Precio:</strong> ${juego.precio.toFixed(2)}</p>
      <p><strong>Valoración:</strong> ⭐ {juego.valoracion}</p>
      {juego.oferta && <p style={{ color: 'orange' }}>🔥 En oferta</p>}
    </div>
  )
}

export default GameDetail
