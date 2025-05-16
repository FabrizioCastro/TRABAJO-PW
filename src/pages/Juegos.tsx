import { useState } from 'react';
import AgregarJuego from './AgregarJuego';

import '../styles/Juegos.css'
import Boton from "../components/Boton"
import Titulo from "../components/Titulo"
import NavBar from '../components/Navbar';

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
    const [juegos, setJuegos] = useState<Juego[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    const agregarJuego = (nuevoJuego: Juego) => {
        setJuegos([...juegos, nuevoJuego]);
    };

    return (
        <div className="container1">
            <NavBar />
            <div className="pagina-juegos">
                <div className="encabezado">
                    <Titulo texto="Juegos" />
                    <div className='row-btn2'>
                        <Boton tipo="button" texto="Filtrar" />
                        <Boton tipo="button" texto="+ Añadir" onClick={() => setMostrarModal(true)} />

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
                        {juegos.map((juego) => (
                            <tr key={juego.id}>
                                <td>{juego.fecha}</td>
                                <td>{juego.categoria}</td>
                                <td>{juego.nombre}</td>
                                <td>{juego.precio}</td>
                                <td>{juego.descuento}</td>
                                <td>
                                    <div className='row-btn1'>
                                        <Boton tipo="button" texto="Editar" />
                                        <Boton tipo="button" texto="Borrar" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {mostrarModal && (
                <AgregarJuego
                    onAgregarJuego={agregarJuego}
                    onCerrar={() => setMostrarModal(false)}
                />
            )}
        </div>

    );
};

export default Juegos;
