import '../styles/Boton.css'

interface BotonProps {
    texto: string
    tipo?: "button" | "submit"
    estilo?: "b1" | "b2"
    onClick?: () => void;
}

const Boton = ({ texto, tipo = "button", estilo = "b1" , onClick}: BotonProps) => {
    const clase = estilo === "b1" ? "button1" : "button2";
    return (
        <div>
            <button type={tipo} className={clase} onClick={onClick}> {texto} </button>
        </div>
    )
};


export default Boton