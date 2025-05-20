import { useState } from 'react';
import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import Titulo from "../components/Titulo"
import Modal from "../components/Modal"
import type { Juego } from './Juegos';

interface AgregarJuegoProps {
    onAgregarJuego: (juego: Juego) => void;
    onCerrar: () => void;
}

const AgregarJuego = ({ onAgregarJuego, onCerrar }: AgregarJuegoProps) => {
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [descuento, setDescuento] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleAgregarJuego = () => {
        const nuevoJuego: Juego = {
            id: Date.now(),
            nombre,
            categoria,
            precio: parseFloat(precio),
            descuento: parseFloat(descuento),
            descripcion,
            fecha: new Date().toLocaleDateString()
        };

        onAgregarJuego(nuevoJuego);
        onCerrar();
    };

    return (
        <Modal onCerrar={onCerrar} >
            <Titulo texto="Agregar juego" />
            <Formulario>
                <div className="row">
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                        <label htmlFor="categoria">Categoría</label>
                        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value="">Seleccionar</option>
                            <option value="Terror">Terror</option>
                            <option value="Acción">Acción</option>
                            <option value="RPG">RPG</option>
                            <option value="Aventura">Aventura</option>
                        </select>

                        <label htmlFor="precio">Precio</label>
                        <input type="text" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />

                        <label htmlFor="descuento">Descuento</label>
                        <input type="text" id="descuento" value={descuento} onChange={(e) => setDescuento(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                        <label htmlFor="imagen">Imagen</label>
                        <div id="preview" className="imagen-cuadro"></div>
                    </div>
                </div>
            </Formulario>

            <div className="row">
                <Boton tipo="button" texto="Cancelar" onClick={onCerrar} />
                <Boton tipo="button" texto="Enviar" onClick={handleAgregarJuego} />
            </div>
        </Modal>
    );
};

export default AgregarJuego;
