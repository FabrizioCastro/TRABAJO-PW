// src/components/Header.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Header() {
  const navigate = useNavigate()
  const [usuarioActivo, setUsuarioActivo] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('usuarioActivo')
    if (data) {
      setUsuarioActivo(JSON.parse(data))
    }
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivo")
    setUsuarioActivo(null)
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
          <div className="user-actions">
            {usuarioActivo ? (
              <>
                <span>Bienvenido, {usuarioActivo.name}</span>
                <button className="btn-secondary" onClick={cerrarSesion}>Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">Iniciar Sesión</Link>
                <Link to="/register" className="btn-primary">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
