import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Game } from '../data/games'


function Cart() {
  const navigate = useNavigate()
  const [carrito, setCarrito] = useState<Game[]>([])
  const [mensaje, setMensaje] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("carrito") || "[]")
    setCarrito(items)
    calcularTotal(items)
  }, [])

  const calcularTotal = (items: Game[]) => {
    const total = items.reduce((acc, item) => acc + item.precio, 0)
    setTotal(total)
  }

  const quitarDelCarrito = (index: number) => {
    const nuevoCarrito = [...carrito]
    const juegoEliminado = nuevoCarrito[index].nombre
    nuevoCarrito.splice(index, 1)
    setCarrito(nuevoCarrito)
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito))
    calcularTotal(nuevoCarrito)
    setMensaje(`${juegoEliminado} eliminado del carrito 🗑️`)
    setTimeout(() => setMensaje(''), 2000)
  }

  const procesarPago = () => {
    if (carrito.length === 0) {
      setMensaje("El carrito está vacío ❌")
      return
    }

    const numeroOrden = "ORD-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    const fecha = new Date().toLocaleString()
    const resumen = {
      numeroOrden,
      fecha,
      total: total.toFixed(2),
      juegos: carrito.map(j => j.nombre)
    }

    // Guardar en historial
    const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]")
    historial.push(resumen)
    localStorage.setItem("historialCompras", JSON.stringify(historial))

    // Limpiar carrito
    localStorage.removeItem("carrito")
    setCarrito([])
    setTotal(0)

    // Guardar resumen temporal y redirigir
    localStorage.setItem("resumenCompra", JSON.stringify(resumen))
    navigate("/resumen")
  }

  return (
    <section className="cart-section">
      <h2><i className="fas fa-shopping-cart"></i> Carrito de Compras</h2>

      <ul className="cart-items">
        {carrito.map((item, index) => (
          <li key={index}>
            {item.nombre} - ${item.precio.toFixed(2)}
            <button onClick={() => quitarDelCarrito(index)}>🗑️</button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p className="total">Total: ${total.toFixed(2)}</p>
        <button className="btn-primary" onClick={procesarPago}>Pagar</button>
      </div>

      {mensaje && <p className="message">{mensaje}</p>}
    </section>
  )
}

export default Cart
