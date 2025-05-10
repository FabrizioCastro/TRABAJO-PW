import '../styles/Boton.css'

interface BotonProps {
    texto : string
    tipo?: "button" | "submit" 
}

const Boton = (props: BotonProps) => {
    return <button type={props.tipo} className="button">{props.texto}</button>
}

export default Boton