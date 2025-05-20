import type { Game } from '../data/games'

interface Props {
  juego: Game
  index: number
}

function GameCard({ juego, index }: Props) {
  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]")
    carrito.push(juego)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    alert(`${juego.nombre} agregado al carrito 🛒`)
  }

  return (
    <div className="juego-card">
      <h3>{juego.nombre}</h3>
      <p>Categoría: {juego.categoria}</p>
      <p>Plataforma: {juego.plataforma}</p>
      <p>Precio: ${juego.precio.toFixed(2)}</p>
      {juego.oferta && <p className="oferta">🔥 En oferta</p>}
      <button onClick={agregarAlCarrito}>Agregar al carrito 🛒</button>
    </div>
  )
}

export default GameCard
