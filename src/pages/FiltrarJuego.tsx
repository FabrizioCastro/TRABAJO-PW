import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import Titulo from "../components/Titulo"
import Modal from "../components/modal"

const FiltrarJuego = () => {
    return (
        <Modal>
            <Titulo texto="Filtro" />
            <Formulario>
                <label htmlFor="lanzamiento-fecha">Fecha de lanzamiento</label>
                <input type="text" id="lanzamiento-fecha" name="lanzamiento-fecha" value="12/03/2025" />

                <label htmlFor="categoria">Categoría</label>
                <select id="categoria" name="categoria">
                    <option>Terror</option>
                    <option>Acción</option>
                    <option>RPG</option>
                    <option>Aventura</option>
                </select>

                <label>Rango de precios</label>
                <div className="row">
                    <input type="number" value="32.50" />
                    <span>a</span>
                    <input type="number" value="232.50" />
                </div>
            </Formulario>

            <div className="row-btn1">
                <Boton tipo="submit" texto="Cancelar" />
                <Boton tipo="submit" texto="Enviar" />
            </div>

        </Modal>
    )
}

export default FiltrarJuego