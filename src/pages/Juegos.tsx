import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import AgregarJuego from './AgregarJuego';
import EliminarJuego from './EliminarJuego';
import FiltrarJuego from './FiltrarJuego';
import Boton from "../components/Boton";
import Titulo from "../components/Titulo";
import EditarJuego from './EditarJuego';
import { type Game } from '../data/games';
import { filtrarJuegos } from '../utils/filtrarJuegos';
import '../styles/Juegos.css';
import { obtenerJuegos, eliminarJuego } from '../services/juegosService'

interface Filtro {
    fechaLanzamiento: string;
    categoria: string;
    precioMin: number;
    precioMax: number;
}

const Juegos = () => {
    console.log("Página Juegos renderizada");
    const [juegos, setJuegos] = useState<Game[]>([]);
    const [mostrarModAgregar, setMostrarModAgregar] = useState(false);
    const [mostrarEditarJuego, setMostrarEditarJuego] = useState(false);
    const [juegoAEliminar, setJuegoAEliminar] = useState<Game | null>(null);
    const [juegoAEditar, setJuegoAEditar] = useState<Game | null>(null);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [filtrosActivos, setFiltrosActivos] = useState<Filtro | null>(null);

    useEffect(() => {
        const cargarJuegos = async () => {
            try {
                const data = await obtenerJuegos()
                setJuegos(data)
            } catch (error) {
                console.error("Error al obtener juegos:", error)
            }
        }
        cargarJuegos()
    }, [])

    const actualizarJuegos = (nuevosJuegos: Game[]) => {
        setJuegos(nuevosJuegos);
        localStorage.setItem('juegos', JSON.stringify(nuevosJuegos));
    };

    const agregarJuego = (nuevoJuego: Game) => {
        const nuevos = [...juegos, nuevoJuego];
        actualizarJuegos(nuevos);
    };


    const handleEliminar = async () => {
        if (!juegoAEliminar) return;

        try {
            await eliminarJuego(juegoAEliminar.id);
            const nuevos = juegos.filter(j => j.id !== juegoAEliminar.id);
            setJuegos(nuevos);
            setJuegoAEliminar(null);
        } catch (error) {
            console.error("Error al eliminar juego:", error);
        }
    };

    const editarJuego = (juegoEditado: Game) => {
        const nuevos = juegos.map(j => j.id === juegoEditado.id ? juegoEditado : j);
        actualizarJuegos(nuevos);
    };

    const juegosFiltrados = filtrosActivos
        ? filtrarJuegos(juegos, filtrosActivos)
        : juegos;

    return (
        <div className="d-flex flex-column w-100 h-100">
            <div className="pagina-juegos">
                <div className="encabezado">
                    <Titulo texto="Juegos" />
                    <div className='row-btn2'>
                        <Boton tipo="button" texto="Filtrar" onClick={() => setMostrarFiltro(true)} />
                        {filtrosActivos && (
                            <Boton tipo="button" texto="Limpiar filtros" onClick={() => setFiltrosActivos(null)} />
                        )}
                        <Boton tipo="button" texto="+ Añadir" onClick={() => setMostrarModAgregar(true)} />
                    </div>

                </div>

                <table className="tabla-juegos">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Plataforma</th>
                            <th>Precio</th>
                            <th>Descuento</th>
                            <th>Precio final</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {juegosFiltrados.map((juego) => {
                            const precioFinal = juego.oferta
                                ? (juego.precio - (juego.precio * juego.descuento / 100)).toFixed(2)
                                : juego.precio.toFixed(2);
                            return (
                                <tr key={juego.id}>
                                    <td>{juego.fecha}</td>
                                    <td>{juego.nombre}</td>
                                    <td>{juego.categoria}</td>
                                    <td>{juego.plataforma}</td>
                                    <td>${juego.precio.toFixed(2)}</td>
                                    <td>{juego.oferta ? `${juego.descuento}%` : '0%'}</td>
                                    <td>${precioFinal}</td>
                                    <td>
                                        <div className='row-btn1'>
                                            <Boton
                                                tipo="button"
                                                texto={<FaEdit />}
                                                onClick={() => {
                                                    setJuegoAEditar(juego)
                                                    setMostrarEditarJuego(true)
                                                }}
                                            />
                                            <Boton
                                                tipo="button"
                                                texto={<FaTrash />}
                                                onClick={() => setJuegoAEliminar(juego)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {mostrarModAgregar && (
                <AgregarJuego
                    onAgregarJuego={agregarJuego}
                    onCerrar={() => setMostrarModAgregar(false)}
                />
            )}

            {juegoAEliminar && (
                <EliminarJuego
                    onConfirmar={handleEliminar}
                    onCancelar={() => setJuegoAEliminar(null)}
                />
            )}

            {mostrarEditarJuego && juegoAEditar && (
                <EditarJuego
                    juego={juegoAEditar}
                    onEditarJuego={editarJuego}
                    onCerrar={() => {
                        setMostrarEditarJuego(false);
                        setJuegoAEditar(null);
                    }}
                />
            )}

            {mostrarFiltro && (
                <FiltrarJuego
                    onFiltrar={(filtroAplicado) => {
                        setFiltrosActivos(filtroAplicado);
                        setMostrarFiltro(false);
                    }}
                    onCerrar={() => setMostrarFiltro(false)}
                />
            )}
        </div>
    );
};

export default Juegos;
