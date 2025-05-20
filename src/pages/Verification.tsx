import { useState } from 'react'
import type { FormEvent } from 'react'

import { useNavigate } from 'react-router-dom'

function Verification() {
  const navigate = useNavigate()
  const [codigo, setCodigo] = useState('')
  const [mensaje, setMensaje] = useState('')

  const manejarVerificacion = (e: FormEvent) => {
    e.preventDefault()

    const pendientes = JSON.parse(localStorage.getItem("usuariosPendientes") || "[]")
    const usuario = pendientes.find((u: any) => u.codigoVerificacion === codigo)

    if (!usuario) {
      setMensaje("Código incorrecto ❌")
      return
    }

    // Mover a lista de usuarios verificados
    const verificados = JSON.parse(localStorage.getItem("usuarios") || "[]")
    verificados.push({
      name: usuario.name,
      email: usuario.email,
      password: usuario.password
    })
    localStorage.setItem("usuarios", JSON.stringify(verificados))

    // Eliminar de pendientes
    const actualizados = pendientes.filter((u: any) => u.codigoVerificacion !== codigo)
    localStorage.setItem("usuariosPendientes", JSON.stringify(actualizados))

    setMensaje("¡Email verificado exitosamente! ✅")
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2><i className="fas fa-envelope"></i> Verificación de Email</h2>
        <form className="auth-form" onSubmit={manejarVerificacion}>
          <div className="form-group">
            <label htmlFor="codigoVerificacion"><i className="fas fa-key"></i> Código de verificación:</label>
            <input
              type="text"
              id="codigoVerificacion"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Verificar</button>
        </form>
        {mensaje && <p className="message">{mensaje}</p>}
      </div>
    </section>
  )
}

export default Verification
