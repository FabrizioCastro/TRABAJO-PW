interface TituloProps {
    texto : string
}

const Titulo =(props : TituloProps) => {
    return <h1 className="text-white text-center">{props.texto}</h1>
}

export default Titulo