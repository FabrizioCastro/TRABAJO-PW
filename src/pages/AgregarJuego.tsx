import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Titulo from "../components/Titulo"
import Modal from "../components/modal"
import "../styles/Contenedor.css"

const AgregarJuego = () => {
    return (
        <Modal>
            <Titulo texto="Editar juego" />
            <div className="contenedor">
                <Formulario>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" />

                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria" name="categoria">
                        <option>Terror</option>
                        <option>Acción</option>
                        <option>RPG</option>
                        <option>Aventura</option>
                    </select>

                    <label htmlFor="precio">Precio</label>
                    <input type="text" id="precio" name="precio" />

                    <label htmlFor="descuento">Descuento</label>
                    <input type="text" id="descuento" name="descuento" />
                </Formulario>

                <Formulario>
                    <label htmlFor="descripcion">Descripcion</label>
                    <textarea id="descripcion" name="descripcion"></textarea>

                    <label htmlFor="imagen">Imagen</label>
                    <div id="preview" className="imagen-cuadro"></div>

                </Formulario>
            </div>
            <div className="botones-contenedor">
                <Boton tipo="submit" texto="Cancelar" />
                <Boton tipo="submit" texto="Enviar" />
            </div>
        </Modal>
    )
}

export default AgregarJuego