import { useEffect, useState } from "react";
import EditarPerfil from "./EditarPerfil";
import ImgPerfil from "../components/ImgUsuario";
import Boton from "../components/Boton";
import '../styles/Perfil.css';
import { UsuariosService } from "../services/usuariosService";

const Perfil = () => {
  const [user, setUser] = useState<{ username: string; email: string; imagen?: string } | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const perfil = await UsuariosService.getProfile();
        setUser(perfil);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setUser(null);
      }
    };

    obtenerPerfil();
  }, [modalAbierto]);

  return (
    <div className="perfil-container">
      <h1>Perfil de usuario</h1>

      {user && <ImgPerfil imagen={user.imagen} />}

      {user ? (
        <>
          <p><strong>Nombre:</strong> {user.username}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <Boton tipo="button" texto="Editar Perfil" onClick={() => setModalAbierto(true)} />
        </>
      ) : (
        <p>No hay usuario cargado</p>
      )}

      {modalAbierto && (
        <EditarPerfil onCerrar={() => setModalAbierto(false)} />
      )}
    </div>
  );
};

export default Perfil;
