import { useState } from "react";
import Boton from "../components/Boton";
import Formulario from "../components/Formulario";
import Titulo from "../components/Titulo";
import Modal from "../components/modal";

interface FiltrarJuegoProps {
    onFiltrar: (filtro: {
        fechaLanzamiento: string;
        categoria: string;
        precioMin: number;
        precioMax: number;
    }) => void;
    onCerrar: () => void;
}

const FiltrarJuego = ({ onFiltrar, onCerrar }: FiltrarJuegoProps) => {
    const [fechaLanzamiento, setFechaLanzamiento] = useState("12/03/2025");
    const [categoria, setCategoria] = useState("Terror");
    const [precioMin, setPrecioMin] = useState(32.5);
    const [precioMax, setPrecioMax] = useState(232.5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFiltrar({
            fechaLanzamiento,
            categoria,
            precioMin,
            precioMax
        });
        onCerrar();
    };

    return (
        <Modal onCerrar={onCerrar}>
            <Titulo texto="Filtro" />
            <Formulario>
                <label htmlFor="lanzamiento-fecha">Fecha de lanzamiento</label>
                <input
                    type="text"
                    id="lanzamiento-fecha"
                    name="lanzamiento-fecha"
                    value={fechaLanzamiento}
                    onChange={(e) => setFechaLanzamiento(e.target.value)}
                />

                <label htmlFor="categoria">Categoría</label>
                <select
                    id="categoria"
                    name="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <option value="RPG">RPG</option>
                    <option value="Terror">Metroidvania</option>
                    <option value="Acción">Acción</option>
                    <option value="Aventura">Aventura</option>
                </select>

                <label>Rango de precios</label>
                <div className="row">
                    <input
                        type="number"
                        value={precioMin}
                        onChange={(e) => setPrecioMin(Number(e.target.value))}
                    />
                    <span>a</span>
                    <input
                        type="number"
                        value={precioMax}
                        onChange={(e) => setPrecioMax(Number(e.target.value))}
                    />
                </div>

                <div className="row-btn1">
                    <Boton tipo="button" texto="Cancelar" onClick={onCerrar} />
                    <Boton tipo="submit" texto="Aplicar" />
                </div>
            </Formulario>
        </Modal>
    );
};

export default FiltrarJuego;
