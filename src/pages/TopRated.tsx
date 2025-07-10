import { useEffect, useState } from 'react'
import { getJuegos } from '../data/games'
import type { Game } from '../data/games'
import {obtenerJuegosMasValorados } from '../services/juegosService'

import GameCard from '../components/GameCard'

function TopRated() {
  const [juegos, setJuegos] = useState<Game[]>([])
  
useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const juegosValorados = await obtenerJuegosMasValorados()
        setJuegos(juegosValorados)
      } catch (error) {
        console.error("Error al cargar juegos más valorados:", error)
      }
    }

    cargarJuegos()
  }, [])
  
  return (
    <section id="masValorados" className="catalog-section">
      <h2><i className="fas fa-star"></i> Juegos Más Valorados</h2>
      <div className="grid-catalogo">
        {juegos.map((juego, index) => (
          <GameCard key={index} juego={juego} index={index} />
        ))}
      </div>
    </section>
  )
}

export default TopRated
