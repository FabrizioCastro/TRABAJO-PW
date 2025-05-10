import Modal from "../components/modal"
import '../styles/CompraExitosa.css'

const CompraExitosa = () => {
    return (
        <Modal>
            <div className="mensaje-compra">
                <h2>¡Compra completada con éxito!</h2>
                <div className="check-icono">&#10003;</div>
            </div>
            <p>Las claves de los juegos adquiridos se han enviado a la dirección de correo electrónico proporcionada.</p>
        </Modal>
    )
}

export default CompraExitosa