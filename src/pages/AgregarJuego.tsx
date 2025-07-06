import { useState, useEffect } from 'react';
import Boton from "../components/Boton";
import Formulario from "../components/Formulario";
import Titulo from "../components/Titulo";
import Modal from '../components/Modal';
import type { GameInput } from '../types';
import { agregarJuego, obtenerCategorias, obtenerPlataformas } from '../services/juegosService';
import type { Categoria, Plataforma } from '../data/models';


interface AgregarJuegoProps {
    onAgregarJuego: (juego: GameInput) => void;
    onCerrar: () => void;
}

const obtenerFechaDDMMYYYY = (): string => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
};

const AgregarJuego = ({ onAgregarJuego, onCerrar }: AgregarJuegoProps) => {
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [descuento, setDescuento] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [imagen, setImagen] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [plataformas, setPlataformas] = useState<Plataforma[]>([]);


    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const cats = await obtenerCategorias();
                console.log("CATEGORÍAS DESDE BACKEND:", cats); 
                setCategorias(cats);
            } catch (e) {
                console.error("Error cargando categorías", e);
            }

            try {
                const plats = await obtenerPlataformas();
                setPlataformas(plats);
            } catch (e) {
                console.error("Error cargando plataformas", e);
            }
        };

        cargarDatos();
    }, []);


    const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagen(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAgregarJuego = async () => {
        if (!nombre || !categoria || !precio || !descripcion || !plataforma || !preview) {
            console.log('Por favor, completa todos los campos obligatorios y sube una imagen.');
            return;
        }

        const precioNumerico = parseFloat(precio);
        const descuentoNumerico = parseFloat(descuento) || 0;

        const nuevoJuego: GameInput = {
            nombre,
            descripcion,
            categoria,
            plataforma,
            precio: precioNumerico,
            descuento: descuentoNumerico,
            oferta: descuentoNumerico > 0,
            ventas: 0,
            valoracion: 0,
            imagen: preview,
            trailer: ""
        };
        
        onAgregarJuego(nuevoJuego);
        limpiarFormulario();
        onCerrar();
    };

    const limpiarFormulario = () => {
        setNombre('');
        setCategoria('');
        setPrecio('');
        setDescuento('');
        setDescripcion('');
        setPlataforma('');
        setImagen(null);
        setPreview(null);
    };

    return (
        <Modal onCerrar={onCerrar}>
            <Titulo texto="Agregar juego" />
            <Formulario>
                <div className="d-flex flex-row gap-4 justify-content-center align-items-start">
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                        <label htmlFor="categoria">Categoría</label>
                        <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                            <option value="">Selecciona una categoría</option>
                            {categorias.map(cat => (
                                <option key={cat.categoriaId} value={cat.nombre}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>



                        <label htmlFor="plataforma">Plataforma</label>
                        <select id="plataforma" value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                            <option value="">Selecciona una plataforma</option>
                            {plataformas.map(plat => (
                                <option key={plat.plataformaId} value={plat.nombre}>
                                    {plat.nombre}
                                </option>
                            ))}
                        </select>


                        <label htmlFor="precio">Precio</label>
                        <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />

                        <label htmlFor="descuento">Descuento (%)</label>
                        <input type="number" id="descuento" value={descuento} onChange={(e) => setDescuento(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                        <label htmlFor="imagen">Subir Imagen</label>
                        <input type="file" id="imagen" accept="image/*" onChange={handleImagenChange} />
                        {preview && (
                            <div className="imagen-cuadro">
                                <img src={preview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: 200 }} />
                            </div>
                        )}
                    </div>
                </div>
            </Formulario>

            <div className="row-btn1">
                <Boton tipo="button" texto="Cancelar" onClick={onCerrar} />
                <Boton tipo="button" texto="Enviar" onClick={handleAgregarJuego} />
            </div>
        </Modal>
    );
};

export default AgregarJuego;
