import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { obtenerJuegos } from '../services/juegosService'; 

interface Juego {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const GameCarousel: React.FC = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const data = await obtenerJuegos();
        setJuegos(data.slice(0, 5)); 
      } catch (error) {
        console.error('Error al cargar juegos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarJuegos();
  }, []);

  if (cargando) {
    return <p className="text-center mt-4">Cargando juegos...</p>;
  }

  if (juegos.length === 0) {
    return <p className="text-center mt-4">No se encontraron juegos para mostrar.</p>;
  }

  return (
    <Carousel fade>
      {juegos.map((juego) => (
        <Carousel.Item key={juego.id}>
          <img
            className="d-block w-100"
            src={juego.imagen}
            alt={juego.nombre}
            style={{ height: '500px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{juego.nombre}</h3>
            <p>{juego.descripcion}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GameCarousel;
