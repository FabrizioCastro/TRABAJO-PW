import ImgPerfil from "../components/ImgUsuario"
import '../styles/NavBar.css'

const NavBar = () => {
    return (
        <div className="sidebar">
            <div className="perfil">
                <ImgPerfil />
                <p className="text-white">Nombre perfil</p>
            </div>

            <nav className="menu">
                <ul>
                    <li><a href="#">Usuarios</a></li>
                    <li><a href="#">Juegos</a></li>
                    <li><a href="#">Noticias</a></li>
                    <li><a href="#">Estadísticas</a></li>
                    <li className="cerrar-sesion"><a href="#">Cerrar sesión</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar