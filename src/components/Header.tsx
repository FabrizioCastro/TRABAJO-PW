// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="main-header">
      <nav className="nav-container">
        <div className="logo">
          <h1>GameMarket</h1>
        </div>
        <div className="nav-links">
          <Link to="/top-vendidos">Más Vendidos</Link>
          <Link to="/top-valorados">Mejor Valorados</Link>
          <Link to="/">Catálogo</Link>
          <Link to="/carrito">Carrito</Link>
          <Link to="/compras">Mis Compras</Link>
          <Link to="/perfil">Perfil</Link>
          <div className="user-actions" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginLeft: 'auto'
          }}>
            {isAuthenticated && user ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{
                  color: '#fff',
                  fontSize: '0.9rem'
                }}>
                  Bienvenid@, {user.username}
                </span>
                <button
                  className="btn-secondary"
                  onClick={handleLogout}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #ff4444',
                    backgroundColor: 'transparent',
                    color: '#ff4444',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff4444'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#ff4444'
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                  to="/login"
                  className="btn-secondary"
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #4CAF50',
                    backgroundColor: 'transparent',
                    color: '#4CAF50',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#4CAF50'
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#4CAF50'
                  }}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#45a049'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#4CAF50'
                  }}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
