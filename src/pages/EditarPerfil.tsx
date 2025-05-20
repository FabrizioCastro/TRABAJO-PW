import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Modal from "../components/Modal"
import Titulo from "../components/Titulo"

const EditarPerfil = () => {
    return (
        <Modal>
            <div className="d-flex flex-row gap-4 justify-content-center align-items-start">
                <ImgPerfil />
                <Formulario>
                    <Titulo texto="Edita la información de tu perfil" />
                    <label htmlFor="primerNombre">Primer Nombre</label>
                    <input type="text" id="primerNombre" name="primerNombre" />
                    <label htmlFor="segundoNombre">Segundo Nombre</label>
                    <input type="text" id="segundoNombre" name="segundoNombre" />
                    <label htmlFor="correo">Correo</label>
                    <input type="email" id="correo" name="correo" />
                    <Boton tipo="submit" texto="Edita información" />
                </Formulario>
            </div>
        </Modal>
    )
}

export default EditarPerfil