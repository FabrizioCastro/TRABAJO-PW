import { useState } from "react";
import Boton from "../components/Boton";
import Formulario from "../components/Formulario";
import Titulo from "../components/Titulo";
import Modal from "../components/Modal";

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
    const [fechaLanzamiento, setFechaLanzamiento] = useState("2017-01-01");
    const [categoria, setCategoria] = useState("RPG");
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(100);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (precioMin > precioMax) {
            setError("El precio mínimo no puede ser mayor que el máximo");
            return;
        }
        setError(null);
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
            <Titulo texto="Filtrar Juegos" />
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <Formulario onSubmit={handleSubmit}>
                <label htmlFor="lanzamiento-fecha">Fecha de lanzamiento desde</label>
                <input
                    type="date"
                    id="lanzamiento-fecha"
                    name="lanzamiento-fecha"
                    value={fechaLanzamiento}
                    onChange={(e) => setFechaLanzamiento(e.target.value)}
                    required
                />

                <label htmlFor="categoria">Categoría</label>
                <select
                    id="categoria"
                    name="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="RPG">RPG</option>
                    <option value="Terror">Terror</option>
                    <option value="Metroidvania">Metroidvania</option>
                    <option value="Acción">Acción</option>
                    <option value="Aventura">Aventura</option>
                </select>

                <label>Rango de precios</label>
                 <div className="d-flex flex-row gap-4 justify-content-center align-items-start">
                    <input
                        type="number"
                        value={precioMin}
                        min={0}
                        step={0.01}
                        onChange={(e) => setPrecioMin(Number(e.target.value))}
                        required
                    />
                    <span style={{ margin: "0 0.5rem" }}>a</span>
                    <input
                        type="number"
                        value={precioMax}
                        min={0}
                        step={0.01}
                        onChange={(e) => setPrecioMax(Number(e.target.value))}
                        required
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
