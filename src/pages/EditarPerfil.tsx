import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Titulo from "../components/Titulo"
import Modal from "../components/modal"

const EditarPerfil = () => {
    return (
        <Modal>
            <div className="row">
                <ImgPerfil />
                <Formulario>
                    <Titulo texto="Edita la información de tu perfil" />
                    <label htmlFor="primerNombre">Primer Nombre</label>
                    <input type="text" id="primerNombre" name="primerNombre" />
                    <label htmlFor="segundoNombre">Segundo Nombre</label>
                    <input type="text" id="segundoNombre" name="segundoNombre" />
                    <label htmlFor="correo">Correo</label>
                    <input type="email" id="correo" name="correo" />
                    <Boton tipo="submit" estilo="b2" texto="Edita información" />
                </Formulario>
                
            </div>
        </Modal>
    )
}

export default EditarPerfil