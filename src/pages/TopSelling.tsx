import { useEffect, useState } from 'react'
import { juegos as juegosOriginales } from '../data/games'
import type { Game } from '../data/games'

import GameCard from '../components/GameCard'

function TopSelling() {
  const [juegos, setJuegos] = useState<Game[]>([])

  useEffect(() => {
    const ordenados = [...juegosOriginales].sort((a, b) => b.ventas - a.ventas)
    setJuegos(ordenados)
  }, [])

  return (
    <section id="masVendidos" className="catalog-section">
      <h2><i className="fas fa-trophy"></i> Juegos Más Vendidos</h2>
      <div className="grid-catalogo">
        {juegos.map((juego, index) => (
          <GameCard key={index} juego={juego} index={index} />
        ))}
      </div>
    </section>
  )
}

export default TopSelling
