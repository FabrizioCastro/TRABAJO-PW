import { useState } from 'react';
import AgregarJuego from './AgregarJuego';
import EliminarJuego from './EliminarJuego';
import FiltrarJuego from './FiltrarJuego'; 
import '../styles/Juegos.css';
import Boton from "../components/Boton";
import Titulo from "../components/Titulo";
import NavBar from '../components/Navbar';
import EditarJuego from './EditarJuego';
import juegosDatos from '../datos/juegos.json'
export interface Juego {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    descuento: number;
    descripcion: string;
    fecha: string;
}

const Juegos = () => {
    const [juegos, setJuegos] = useState<Juego[]>(juegosDatos);
    const [mostrarModAgregar, setMostrarModAgregar] = useState(false);
    const [mostrarEditarJuego, setMostrarEditarJuego] = useState(false);
    const [juegoAEliminar, setJuegoAEliminar] = useState<Juego | null>(null);
    const [juegoAEditar, setJuegoAEditar] = useState<Juego | null>(null);

    const [mostrarFiltro, setMostrarFiltro] = useState(false);
    const [filtro, setFiltro] = useState<{
        fechaLanzamiento?: string;
        categoria?: string;
        precioMin?: number;
        precioMax?: number;
    } | null>(null);

    const agregarJuego = (nuevoJuego: Juego) => {
        setJuegos([...juegos, nuevoJuego]);
    };

    const handleEliminar = () => {
        if (juegoAEliminar) {
            setJuegos(juegos.filter(j => j.id !== juegoAEliminar.id));
            setJuegoAEliminar(null);
        }
    };

    const editarJuego = (juegoEditado: Juego) => {
        setJuegos(juegos.map(j => j.id === juegoEditado.id ? juegoEditado : j));
    };

   
    const juegosFiltrados = filtro
        ? juegos.filter(j => {
          
            const cumpleFecha = filtro.fechaLanzamiento ? j.fecha === filtro.fechaLanzamiento : true;
        
            const cumpleCategoria = filtro.categoria ? j.categoria === filtro.categoria : true;
           
            const cumplePrecioMin = filtro.precioMin !== undefined ? j.precio >= filtro.precioMin : true;
            const cumplePrecioMax = filtro.precioMax !== undefined ? j.precio <= filtro.precioMax : true;
            return cumpleFecha && cumpleCategoria && cumplePrecioMin && cumplePrecioMax;
        })
        : juegos;

    return (
        <div className="container1">
            <NavBar />
            <div className="pagina-juegos">
                <div className="encabezado">
                    <Titulo texto="Juegos" />
                    <div className='row-btn2'>
                        <Boton tipo="button" texto="Filtrar" onClick={() => setMostrarFiltro(true)} />
                        <Boton tipo="button" texto="+ Añadir" onClick={() => setMostrarModAgregar(true)} />
                    </div>
                </div>

                <table className="tabla-juegos">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Categoría</th>
                            <th>Nombre</th>
                            <th>Precio base</th>
                            <th>Descuento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {juegosFiltrados.map((juego) => (
                            <tr key={juego.id}>
                                <td>{juego.fecha}</td>
                                <td>{juego.categoria}</td>
                                <td>{juego.nombre}</td>
                                <td>{juego.precio}</td>
                                <td>{juego.descuento}</td>
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
                        ))}
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
                    onFiltrar={(filtroAplicado) => setFiltro(filtroAplicado)}
                    onCerrar={() => setMostrarFiltro(false)}
                />
            )}
        </div>
    );
};

export default Juegos;
