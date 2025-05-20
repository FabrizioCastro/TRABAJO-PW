import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { hashPassword } from '../utils/hash'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const manejarSubmit = (e: FormEvent) => {
    e.preventDefault()

    const tieneArroba = email.includes('@')
    const tienePunto = email.includes('.')

    if (!tieneArroba || !tienePunto) {
      setMensaje('Correo inválido ❌')
      return
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const hashedPassword = hashPassword(password)

    const usuarioEncontrado = usuarios.find(
      (user: any) => user.email === email && user.password === hashedPassword
    )

    if (usuarioEncontrado) {
      // Usar el contexto de autenticación para iniciar sesión
      login({
        id: usuarioEncontrado.id,
        username: usuarioEncontrado.name,
        email: usuarioEncontrado.email
      })
      
      setMensaje(`Bienvenido/a, ${usuarioEncontrado.name} ✅`)

      // Si es admin, redirigir al panel
      if (usuarioEncontrado.email === 'admin@admin.com') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      setMensaje('Correo o contraseña incorrectos ❌')
    }
  }

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h2><i className="fas fa-sign-in-alt"></i> Iniciar Sesión</h2>
        <form className="auth-form" onSubmit={manejarSubmit}>
          <div className="form-group">
            <label htmlFor="email"><i className="fas fa-envelope"></i> Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"><i className="fas fa-lock"></i> Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Ingresar</button>
        </form>
        {mensaje && <p className="message">{mensaje}</p>}
      </div>
    </section>
  )
}

export default Login
