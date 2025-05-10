import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Titulo from "../components/Titulo"
import Modal from "../components/modal"
import "../styles/Contenedor.css"
const EditarPerfil = ()=>{
    return(
        <Modal>
            <div className="contenedor">
               <ImgPerfil/>
                <div>
                    <Titulo texto="Edita la información de tu perfil"/>
                        <Formulario>
                            <label htmlFor="primerNombre">Primer Nombre</label>
                            <input type="text" id="primerNombre" name="primerNombre" />
                
                            <label htmlFor="segundoNombre">Segundo Nombre</label>
                            <input type="text" id="segundoNombre" name="segundoNombre" />
                
                            <label htmlFor="correo">Correo</label>
                            <input type="email" id="correo" name="correo" />
                            <Boton tipo="submit" texto="Edita información"/>
                        </Formulario>
                </div>
            </div>
        </Modal>
    )
}

export default EditarPerfil