import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import Titulo from "../components/Titulo"
import Modal from "../components/modal"

const AgregarJuego = () => {
    return (
        <Modal>
            <Titulo texto="Agregar juego" />
            <Formulario>
                <div className="row">
                    <div>
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
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripcion</label>
                        <textarea id="descripcion" name="descripcion"></textarea>
                        <label htmlFor="imagen">Imagen</label>
                        <div id="preview" className="imagen-cuadro"></div>
                    </div>
                </div>
            </Formulario>
            <div className="row">
                <Boton tipo="submit" texto="Cancelar" />
                <Boton tipo="submit" texto="Enviar" />
            </div>
        </Modal>
    )
}

export default AgregarJuego