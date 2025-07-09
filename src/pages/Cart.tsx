import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Game } from '../data/games'
import { useAuth } from '../context/AuthContext'
import CompraExitosa from './CompraExitosa'
import { VentasService } from '../services/ventasService'

function Cart() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [carrito, setCarrito] = useState<Game[]>([])
  const [mensaje, setMensaje] = useState('')
  const [total, setTotal] = useState(0)
  const [compraExitosa, setCompraExitosa] = useState(false)
  const [mostrarFormularioPago, setMostrarFormularioPago] = useState(false)
  const [datosPago, setDatosPago] = useState({
    nombre: '',
    tarjeta: '',
    vencimiento: '',
    cvv: ''
  })

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

  const handleChangePago = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDatosPago(prev => ({ ...prev, [name]: value }))
  }

  const validarDatosPago = () => {
    const { nombre, tarjeta, vencimiento, cvv } = datosPago
    if (!nombre || !tarjeta || !vencimiento || !cvv) {
      setMensaje("Debes completar todos los campos de pago")
      return false
    }
    if (!/^\d{16}$/.test(tarjeta)) {
      setMensaje("La tarjeta debe tener 16 dígitos")
      return false
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setMensaje("El CVV debe tener 3 o 4 dígitos")
      return false
    }
    return true
  }

  const procesarPago = async () => {
    try {
      if (carrito.length === 0) {
        setMensaje("El carrito está vacío")
        return
      }

      if (!user) {
        setMensaje("Debes iniciar sesión para realizar la compra")
        return
      }

      if (!validarDatosPago()) return

      const juegosPayload = carrito.map(j => ({
        juegoId: j.id,
        cantidad: 1
      }))

      const data = await VentasService.comprarJuegos(juegosPayload)

      const resumen = {
        numeroOrden: data.orden,
        fecha: new Date(data.fecha).toLocaleString(),
        total: data.total.toFixed(2),
        juegos: data.juegos.map((j: any) => j.nombre),
        claves: data.juegos.flatMap((j: any) =>
          j.claves.map((clave: string) => `${j.nombre}: ${clave}`)
        )
      }

      const historial = JSON.parse(localStorage.getItem("historialCompras") || "[]")
      historial.push(resumen)
      localStorage.setItem("historialCompras", JSON.stringify(historial))
      localStorage.setItem("resumenCompra", JSON.stringify(resumen))

      localStorage.removeItem("carrito")
      setCarrito([])
      setTotal(0)
      setCompraExitosa(true)

      setTimeout(() => {
        navigate("/resumen")
      }, 3000)

    } catch (error: any) {
      console.error('Error al procesar el pago:', error)
      setMensaje(error.message || "Error al procesar el pago")
    }
  }

  return (
    <section className="cart-section">
      <h2><i className="fas fa-shopping-cart"></i> Carrito de Compras</h2>

      {mensaje && <div className="message">{mensaje}</div>}
      {compraExitosa && <CompraExitosa />}

      {carrito.length === 0 && !compraExitosa ? (
        <p>Tu carrito está vacío</p>
      ) : !compraExitosa && (
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

            {!mostrarFormularioPago ? (
              <button onClick={() => setMostrarFormularioPago(true)} className="btn-primary">
                Proceder al Pago
              </button>
            ) : (
              <div className="formulario-pago">
                <h4>Datos de pago simulados</h4>
                <input type="text" name="nombre" placeholder="Nombre del titular" value={datosPago.nombre} onChange={handleChangePago} required />
                <input type="text" name="tarjeta" placeholder="Número de tarjeta (16 dígitos)" value={datosPago.tarjeta} onChange={handleChangePago} required />
                <input type="text" name="vencimiento" placeholder="MM/AA" value={datosPago.vencimiento} onChange={handleChangePago} required />
                <input type="text" name="cvv" placeholder="CVV (3-4 dígitos)" value={datosPago.cvv} onChange={handleChangePago} required />
                <button onClick={procesarPago} className="btn-success">
                  Confirmar y Pagar
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default Cart
