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
    const total = items.reduce((acc, item) => {
      const precio = item.descuento 
        ? item.precio * (1 - item.descuento / 100)
        : item.precio
      return acc + precio
    }, 0)
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
      
      {mensaje && <div className="message">{mensaje}</div>}

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-items">
            {carrito.map((juego, index) => (
              <li key={index}>
                <div className="item-info">
                  <h3>{juego.nombre}</h3>
                  {juego.descuento ? (
                    <div className="precio-container">
                      <p className="precio-original">${juego.precio.toFixed(2)}</p>
                      <p className="precio-descuento">
                        ${(juego.precio * (1 - juego.descuento / 100)).toFixed(2)}
                      </p>
                      <span className="descuento-badge">-{juego.descuento}%</span>
                    </div>
                  ) : (
                    <p>Precio: ${juego.precio.toFixed(2)}</p>
                  )}
                </div>
                <button onClick={() => quitarDelCarrito(index)} className="btn-danger">
                  <i className="fas fa-trash"></i> Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Resumen de la Compra</h3>
            <p className="total">Total: ${total.toFixed(2)}</p>
            <button onClick={procesarPago} className="btn-primary">
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
