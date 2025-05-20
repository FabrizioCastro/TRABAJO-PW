{/*
    import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import EditarPerfil from "./EditarPerfil";
import ImgPerfil from "../components/ImgUsuario";
import Boton from "../components/Boton";

const Perfil = () => {
  const [usuario, setUsuario] = useState<{ name: string; email: string; imagen?: string } | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem("usuarios");
    if (storedUsers) {
      const usersArray = JSON.parse(storedUsers);
      setUsuario(usersArray[0]);
    }
  }, [modalAbierto]);

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {usuario && (
        <ImgPerfil
          imagen={usuario.imagen}
        />
      )}

      <h1>Perfil de usuario</h1>

      {usuario ? (
        <>
          <p><strong>Nombre:</strong> {usuario.name}</p>
          <p><strong>Correo:</strong> {usuario.email}</p>

            <Boton tipo="button" texto="+ Editar Perfil" onClick={() => setModalAbierto(true)} />
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

    
    */}