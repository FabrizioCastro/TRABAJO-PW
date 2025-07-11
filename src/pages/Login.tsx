import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AuthService } from '../services/authService'
import MensajeEstado from '../components/MensajeEstado';

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'exito'; texto: string } | null>(null);

  const manejarSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tieneArroba = email.includes('@');
    const tienePunto = email.includes('.');

    if (!tieneArroba || !tienePunto) {
      setMensaje({ tipo: 'error', texto: 'Correo inválido' });
      return;
    }

    try {
      const res = await AuthService.login(email, password);

      if (res.token) {
        login(res.token, res.usuario)

        setMensaje({ tipo: 'exito', texto: `Bienvenido/a, ${res.usuario.username}` });

        if (res.usuario.rol === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setMensaje({ tipo: 'error', texto: res.error || 'Correo o contraseña incorrectos' });
      }
    } catch (error) {
      console.error(error);
      setMensaje({ tipo: 'error', texto: 'Error de conexión con el servidor' });
    }
  };

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

          <button type="submit" className="btn-primary">
            Iniciar Sesión
          </button>
        </form>

        {mensaje && (
          <div className="mt-3">
            <MensajeEstado tipo={mensaje.tipo} mensaje={mensaje.texto} onCerrar={() => setMensaje(null)} />
          </div>
        )}

        <p className="login-link">
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </p>
        <p className="login-link">
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </p>
      </div>
    </section>
  )
}

export default Login
