import { useState } from 'react'
import type { FormEvent } from 'react'

import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../utils/hash'

function generarCodigoVerificacion(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function Register() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const manejarRegistro = (e: FormEvent) => {
    e.preventDefault()

    const tieneArroba = email.includes('@')
    const tienePunto = email.includes('.')

    if (!tieneArroba || !tienePunto) {
      setMensaje('Correo inválido ❌')
      return
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const yaExiste = usuarios.find((u: any) => u.email === email)
    if (yaExiste) {
      setMensaje("Este correo ya está registrado 📧")
      return
    }

    const codigo = generarCodigoVerificacion()
    const usuarioPendiente = {
      name: nombre,
      email,
      password: hashPassword(password),
      codigoVerificacion: codigo,
      fechaRegistro: new Date().toISOString()
    }

    const pendientes = JSON.parse(localStorage.getItem("usuariosPendientes") || "[]")
    pendientes.push(usuarioPendiente)
    localStorage.setItem("usuariosPendientes", JSON.stringify(pendientes))

    console.log(`Simulando envío de correo a ${email} con código: ${codigo}`)

    localStorage.setItem("codigoVerificacionPendiente", JSON.stringify({ email, codigo }))
    setMensaje("Código enviado al correo. Verifica tu cuenta ✉️")
    navigate('/verificacion')
  }

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2><i className="fas fa-user-plus"></i> Registro</h2>
        <form className="auth-form" onSubmit={manejarRegistro}>
          <div className="form-group">
            <label htmlFor="regName"><i className="fas fa-user"></i> Nombre:</label>
            <input
              type="text"
              id="regName"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regEmail"><i className="fas fa-envelope"></i> Correo electrónico:</label>
            <input
              type="email"
              id="regEmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regPassword"><i className="fas fa-lock"></i> Contraseña:</label>
            <input
              type="password"
              id="regPassword"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Registrarme</button>
        </form>
        {mensaje && <p className="message">{mensaje}</p>}
      </div>
    </section>
  )
}

export default Register
