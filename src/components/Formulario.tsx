import "../styles/Formulario.css""

const Formulario = ({children})=>{
    return(
        <form className="formulario-contenedor">
            {children}
        </form>
    )
}

export default Formulario