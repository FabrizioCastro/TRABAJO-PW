import { useEffect, useState } from 'react'

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

  useEffect(() => {
    const dataVerificados = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const dataPendientes = JSON.parse(localStorage.getItem("usuariosPendientes") || "[]")
    setUsuarios(dataVerificados)
    setPendientes(dataPendientes)
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

  return (
    <section className="admin-panel">
      <h2><i className="fas fa-user-shield"></i> Panel de Administrador</h2>

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
