import { useEffect, useState } from 'react'
import { juegos } from '../data/games'
import type { Game } from '../data/games'

interface Usuario {
  name: string
  email: string
  password?: string
  codigoVerificacion?: string
  fechaRegistro?: string
}

function AdminPanel() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [pendientes, setPendientes] = useState<Usuario[]>([])
  const [juegosList, setJuegosList] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [descuento, setDescuento] = useState<number>(0)

  useEffect(() => {
    const dataVerificados = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const dataPendientes = JSON.parse(localStorage.getItem("usuariosPendientes") || "[]")
    setUsuarios(dataVerificados)
    setPendientes(dataPendientes)
    setJuegosList(juegos)
  }, [])

  const eliminarUsuario = (email: string) => {
    if (!confirm(`¿Eliminar al usuario ${email}?`)) return

    const nuevos = usuarios.filter(u => u.email !== email)
    localStorage.setItem("usuarios", JSON.stringify(nuevos))
    setUsuarios(nuevos)
  }

  const eliminarPendiente = (email: string) => {
    if (!confirm(`¿Eliminar usuario pendiente ${email}?`)) return

    const nuevos = pendientes.filter(u => u.email !== email)
    localStorage.setItem("usuariosPendientes", JSON.stringify(nuevos))
    setPendientes(nuevos)
  }

  const verificarUsuario = (email: string) => {
    const user = pendientes.find(u => u.email === email)
    if (!user) return

    const nuevosVerificados = [...usuarios, {
      name: user.name,
      email: user.email,
      password: user.password
    }]
    const nuevosPendientes = pendientes.filter(u => u.email !== email)

    localStorage.setItem("usuarios", JSON.stringify(nuevosVerificados))
    localStorage.setItem("usuariosPendientes", JSON.stringify(nuevosPendientes))

    setUsuarios(nuevosVerificados)
    setPendientes(nuevosPendientes)
  }

  const aplicarDescuento = () => {
    if (!selectedGame) return

    const nuevosJuegos = juegosList.map(juego => {
      if (juego.id === selectedGame.id) {
        return {
          ...juego,
          oferta: descuento > 0,
          descuento: descuento
        }
      }
      return juego
    })

    setJuegosList(nuevosJuegos)
    localStorage.setItem("juegos", JSON.stringify(nuevosJuegos))
    alert(`Descuento de ${descuento}% aplicado a ${selectedGame.nombre}`)
    setSelectedGame(null)
    setDescuento(0)
  }

  return (
    <section className="admin-panel">
      <h2><i className="fas fa-user-shield"></i> Panel de Administrador</h2>

      {/* Sección de Descuentos */}
      <div className="admin-section">
        <h3><i className="fas fa-tags"></i> Gestión de Descuentos</h3>
        <div className="discount-controls">
          <select 
            value={selectedGame?.id || ''} 
            onChange={(e) => {
              const game = juegosList.find(g => g.id === Number(e.target.value))
              setSelectedGame(game || null)
              setDescuento(game?.descuento || 0)
            }}
            className="form-select"
          >
            <option value="">Seleccionar juego</option>
            {juegosList.map(juego => (
              <option key={juego.id} value={juego.id}>
                {juego.nombre} - ${juego.precio}
              </option>
            ))}
          </select>

          <div className="discount-input">
            <label>Porcentaje de descuento:</label>
            <input
              type="number"
              min="0"
              max="100"
              value={descuento}
              onChange={(e) => setDescuento(Number(e.target.value))}
              className="form-control"
            />
          </div>

          <button 
            onClick={aplicarDescuento}
            disabled={!selectedGame}
            className="btn-primary"
          >
            Aplicar Descuento
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <p>Total de usuarios registrados: <strong>{usuarios.length}</strong></p>
        <p>Usuarios pendientes de verificación: <strong>{pendientes.length}</strong></p>
      </div>

      <div className="admin-table-container">
        <h3><i className="fas fa-users"></i> Lista de Usuarios Verificados</h3>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => eliminarUsuario(u.email)} className="btn-danger">
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3><i className="fas fa-user-clock"></i> Usuarios Pendientes</h3>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pendientes.map((u, i) => (
                <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{new Date(u.fechaRegistro!).toLocaleString()}</td>
                  <td>
                    <button onClick={() => verificarUsuario(u.email)} className="btn-success">
                      <i className="fas fa-check"></i> Verificar
                    </button>
                    <button onClick={() => eliminarPendiente(u.email)} className="btn-danger">
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminPanel
