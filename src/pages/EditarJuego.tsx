import { useState, useEffect } from "react";
import Boton from "../components/Boton";
import Formulario from "../components/Formulario";
import Titulo from "../components/Titulo";
import Modal from "../components/modal";
import type { Juego } from "./Juegos";

interface EditarJuegoProps {
  juego: Juego;
  onEditarJuego: (juego: Juego) => void;
  onCerrar: () => void;
}

const EditarJuego = ({ juego, onEditarJuego, onCerrar }: EditarJuegoProps) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Terror");
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    setNombre(juego.nombre);
    setCategoria(juego.categoria);
    setPrecio(juego.precio.toString());
    setDescuento(juego.descuento.toString());
    setDescripcion(juego.descripcion);
  }, [juego]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const juegoEditado: Juego = {
      ...juego,
      nombre,
      categoria,
      precio: parseFloat(precio),
      descuento: parseFloat(descuento),
      descripcion,
    };

    onEditarJuego(juegoEditado);
    onCerrar();
  };

  return (
    <Modal onCerrar={onCerrar}>
      <Titulo texto="Editar juego" />
      <Formulario>
        <div className="row">
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />

            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option>Terror</option>
              <option>Acción</option>
              <option>RPG</option>
              <option>Aventura</option>
            </select>

            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />

            <label htmlFor="descuento">Descuento</label>
            <input
              type="number"
              id="descuento"
              name="descuento"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>

            <label htmlFor="imagen">Imagen</label>
            <div id="preview" className="imagen-cuadro">[Vista previa aquí]</div>
          </div>
        </div>

        <div className="row">
          <Boton tipo="button" texto="Cancelar" onClick={onCerrar} />
          <Boton tipo="submit" texto="Guardar cambios" />
        </div>
      </Formulario>
    </Modal>
  );
};

export default EditarJuego;
