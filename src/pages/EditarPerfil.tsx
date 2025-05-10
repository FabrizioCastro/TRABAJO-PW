import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import Titulo from "../components/Titulo"
import Modal from "../components/modal"


const EditarPerfil = ()=>{
    return(
        <Modal>
            <div className="perfil-contenedor">
                <div className="perfil-imagen">Tu imagen de perfil</div>

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