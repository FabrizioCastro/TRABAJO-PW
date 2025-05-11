import '../styles/ImgPerfil.css'
interface ImgPerfilProps {
    src?: string;
    alt?: string;
}

const ImgPerfil = ({ src, alt = "Imagen de perfil" }: ImgPerfilProps) => {
    return (
        <div>
             <div className="perfil-imagen">
            {src ? (
                <img src={src} alt={alt}/>
            ) : (
                "Tu imagen de perfil"
            )}
        </div>

        </div>
       
    );
};

export default ImgPerfil;