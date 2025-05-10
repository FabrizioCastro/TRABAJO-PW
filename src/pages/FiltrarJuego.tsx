import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Titulo from "../components/Titulo"
import Modal from "../components/modal"
import "../styles/Contenedor.css"

const FiltrarJuego = () => {
    return (
        <Modal>
            <Formulario>
                <Titulo texto="Filtro" />
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
                <div className="precio-rango">
                    <input type="number" value="32.50" />
                    <span>a</span>
                    <input type="number" value="232.50" />
                </div>

                <div className="botones-contenedor">
                    <Boton tipo="submit" texto="Cancelar" />
                    <Boton tipo="submit" texto="Enviar" />
                </div>
            </Formulario>

        </Modal>
    )
}

export default FiltrarJuego