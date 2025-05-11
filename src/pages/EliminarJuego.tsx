import Boton from "../components/Boton"
import Modal from "../components/modal"
import Titulo from "../components/Titulo"

const EliminarJuego = () => {
    return (
        <Modal>
            <Titulo texto="¿Estas seguro que deseas eliminar este registro?" />
            <div className="row-btn1">
                <Boton tipo="button" texto="Cancelar" />
                <Boton tipo="submit" texto="Enviar" />
            </div>
        </Modal>
    )
}

export default EliminarJuego