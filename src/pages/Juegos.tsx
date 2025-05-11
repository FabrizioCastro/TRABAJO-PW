import '../styles/Juegos.css'
import Boton from "../components/Boton"
import Titulo from "../components/Titulo"
import NavBar from '../components/Navbar';

const Juegos = () => {
    return (
        <div className="container1">
            <NavBar />
            <div className="pagina-juegos">
                <div className="encabezado">
                    <Titulo texto="Juegos" />
                    <div className='row-btn2'>
                        <Boton tipo="button"  texto="Filtrar" />
                        <Boton tipo="button"  texto="+ Añadir" />
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
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>
                                 <div className='row-btn1'>
                                <Boton tipo="button"  texto="Editar" />
                                <Boton tipo="button"  texto="Borrar" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Juegos;
