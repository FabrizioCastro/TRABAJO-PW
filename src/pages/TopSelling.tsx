import { useEffect, useState } from 'react'
import { getJuegos } from '../data/games'
import type { Game } from '../data/games'
import { obtenerRankingJuegos } from '../services/juegosService';
import GameCard from '../components/GameCard'

function TopSelling() {
  const [juegos, setJuegos] = useState<Game[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarRanking = async () => {
      try {
        const juegosDesdeBackend = await obtenerRankingJuegos();
        setJuegos(juegosDesdeBackend);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el ranking de juegos.");
      }
    };

    cargarRanking();
  }, []);

  return (
    <section id="masVendidos" className="catalog-section">
      <h2><i className="fas fa-trophy"></i> Juegos Más Vendidos</h2>
     {error && <div className="alert alert-danger">{error}</div>}
      <div className="grid-catalogo">
        {juegos.map((juego, index) => (
          <GameCard key={index} juego={juego} index={index} />
        ))}
      </div>
    </section>
  )
}

export default TopSelling