interface ImgPerfilProps {
  imagen?: string;
  nombre?: string;
}

const ImgPerfil = ({ imagen, nombre }: ImgPerfilProps) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="perfil-imagen">
        {imagen ? (
          <img src={imagen} alt={`Imagen de perfil de ${nombre || 'usuario'}`} />
        ) : (
          <span>Tu imagen de perfil</span>
        )}
      </div>
      {nombre && <p className="text-white">{nombre}</p>}
    </div>
  );
};


export default ImgPerfil;
