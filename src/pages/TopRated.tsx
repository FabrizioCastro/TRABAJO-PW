import { useEffect, useState } from 'react'
import { juegos as juegosOriginales } from '../data/games'
import type { Game } from '../data/games'

import GameCard from '../components/GameCard'

function TopRated() {
  const [juegos, setJuegos] = useState<Game[]>([])

  useEffect(() => {
    const ordenados = [...juegosOriginales].sort((a, b) => b.valoracion - a.valoracion)
    setJuegos(ordenados)
  }, [])

  return (
    <section id="mejorValorados" className="catalog-section">
      <h2><i className="fas fa-star"></i> Juegos Mejor Valorados</h2>
      <div className="grid-catalogo">
        {juegos.map((juego, index) => (
          <GameCard key={index} juego={juego} index={index} />
        ))}
      </div>
    </section>
  )
}

export default TopRated
