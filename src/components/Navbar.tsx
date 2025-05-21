import { Link } from "react-router-dom"
import ImgPerfil from "../components/ImgUsuario"
import '../styles/NavBar.css'

interface NavBarProps {
  nombreUsuario?: string
  imagenUsuario?: string
  onLogout?: () => void
}


const NavBar = ({ nombreUsuario = "Nombre perfil", imagenUsuario, onLogout }: NavBarProps) => {
  return (
    
    <aside className="sidebar">
      <div className="perfil">
        <ImgPerfil imagen={imagenUsuario} nombre={nombreUsuario} />
      </div>

      <nav className="menu">
        <ul>
          <li><Link to="/admin">Usuarios</Link></li>
          <li><Link to="/admin/juegos">Juegos</Link></li>
          <li><Link to="/admin//noticias">Noticias</Link></li>
          <li><Link to="/admin//estadisticas">Estadísticas</Link></li>
          <li className="cerrar-sesion">
            {onLogout ? (
              <button onClick={onLogout} className="btn-logout">Cerrar sesión</button>
            ) : (
              <Link to="/logout">Cerrar sesión</Link> 
            )}
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default NavBar
