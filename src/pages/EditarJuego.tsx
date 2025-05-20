import { useState, useEffect } from "react";
import Boton from "../components/Boton";
import Formulario from "../components/Formulario";
import Titulo from "../components/Titulo";
import Modal from "../components/modal";
import type { Game } from "../data/games";

interface EditarJuegoProps {
  juego: Game;
  onEditarJuego: (juego: Game) => void;
  onCerrar: () => void;
}

const EditarJuego = ({ juego, onEditarJuego, onCerrar }: EditarJuegoProps) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Terror");
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [plataforma, setPlataforma] = useState('');
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setNombre(juego.nombre || "");
    setCategoria(juego.categoria || "Terror");
    setPrecio(juego.precio !== undefined ? juego.precio.toString() : "");
    setDescuento(juego.descuento !== undefined ? juego.descuento.toString() : "0");
    setDescripcion(juego.descripcion || "");
    setPlataforma(juego.plataforma || "");
    setPreview(typeof juego.imagen === 'string' ? juego.imagen : null);
    setArchivoImagen(null);
  }, [juego]);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoria) {
      alert("Selecciona una categoría");
      return;
    }
    if (!plataforma) {
      alert("Selecciona una plataforma");
      return;
    }

    const precioNumber = parseFloat(precio);
    const descuentoNumber = parseFloat(descuento);

    if (isNaN(precioNumber) || isNaN(descuentoNumber)) {
      alert("Precio y descuento deben ser números válidos");
      return;
    }

    const juegoEditado: Game = {
      ...juego,
      nombre,
      categoria,
      precio: precioNumber,
      descuento: descuentoNumber,
      descripcion,
      plataforma,
      imagen: archivoImagen ? archivoImagen : juego.imagen,
    };

    onEditarJuego(juegoEditado);
    onCerrar();
  };

  return (
    <Modal onCerrar={onCerrar}>
      <Titulo texto="Editar juego" />
      <Formulario onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Terror">Terror</option>
              <option value="Acción">Acción</option>
              <option value="RPG">RPG</option>
              <option value="Aventura">Aventura</option>
              <option value="Metroidvania">Metroidvania</option>
            </select>

            <label htmlFor="plataforma">Plataforma</label>
            <select
              id="plataforma"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Nintendo">Nintendo</option>
              <option value="Xbox">Xbox</option>
            </select>

            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min={0}
              step="0.01"
            />

            <label htmlFor="descuento">Descuento (%)</label>
            <input
              type="number"
              id="descuento"
              name="descuento"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
              min={0}
              max={100}
              step={1}
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

            <label htmlFor="imagen">Subir Imagen</label>
            <input type="file" id="imagen" accept="image/*" onChange={handleImagenChange} />
            {preview && (
              <div className="imagen-cuadro" style={{ marginTop: 10 }}>
                <img
                  src={preview}
                  alt="Vista previa"
                  style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, objectFit: "contain", boxShadow: "0 0 5px rgba(0,0,0,0.2)" }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="row" style={{ marginTop: 20, display: "flex", gap: "10px" }}>
          <Boton tipo="button" texto="Cancelar" onClick={onCerrar} />
          <Boton tipo="submit" texto="Guardar cambios" />
        </div>
      </Formulario>
    </Modal>
  );
};

export default EditarJuego;
