import { useState } from 'react';
import AgregarJuego from './AgregarJuego';
import EliminarJuego from './EliminarJuego';
import FiltrarJuego from './FiltrarJuego';
import '../styles/Juegos.css';
import Boton from "../components/Boton";
import Titulo from "../components/Titulo";
import NavBar from '../components/Navbar';
import EditarJuego from './EditarJuego';
import { juegos as juegosData, type Game } from '../data/games';
import { filtrarJuegos } from '../utils/filtrarJuegos';

interface Filtro {
    fechaLanzamiento: string;
    categoria: string;
    precioMin: number;
    precioMax: number;
}

const Juegos = () => {
    const [juegos, setJuegos] = useState<Game[]>(juegosData);
    const [mostrarModAgregar, setMostrarModAgregar] = useState(false);
    const [mostrarEditarJuego, setMostrarEditarJuego] = useState(false);
    const [juegoAEliminar, setJuegoAEliminar] = useState<Game | null>(null);
    const [juegoAEditar, setJuegoAEditar] = useState<Game | null>(null);
    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [filtrosActivos, setFiltrosActivos] = useState<Filtro | null>(null);

    const agregarJuego = (nuevoJuego: Game) => {
        setJuegos([...juegos, nuevoJuego]);
    };

    const handleEliminar = () => {
        if (juegoAEliminar) {
            setJuegos(juegos.filter(j => j.id !== juegoAEliminar.id));
            setJuegoAEliminar(null);
        }
    };

    const editarJuego = (juegoEditado: Game) => {
        setJuegos(juegos.map(j => j.id === juegoEditado.id ? juegoEditado : j));
    };

    const juegosFiltrados = filtrosActivos
        ? filtrarJuegos(juegos, filtrosActivos)
        : juegos;

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex">
            <NavBar />
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
                                            <Boton tipo="button" texto="Editar" onClick={() => {
                                                setJuegoAEditar(juego);
                                                setMostrarEditarJuego(true);
                                            }} />
                                            <Boton tipo="button" texto="Borrar" onClick={() => setJuegoAEliminar(juego)} />
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
