import "../styles/Formulario.css"

const Formulario = ({children})=>{
    return(
        <div>
            <form className="formulario-contenedor">
                {children}
            </form>
        </div>
    )
}

export default Formulario