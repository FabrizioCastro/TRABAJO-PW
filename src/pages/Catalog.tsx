import { useEffect, useState } from 'react'
import { getJuegos } from '../data/games'
import type { Game } from '../data/games'
import { obtenerJuegos } from '../services/juegosService'
import GameCard from '../components/GameCard'

function Catalog() {
  const [juegos, setJuegos] = useState<Game[]>([])
  const [categoria, setCategoria] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [soloOferta, setSoloOferta] = useState(false)
  const [precioMax, setPrecioMax] = useState<number | ''>('')

useEffect(() => {
  const fetchJuegos = async () => {
    try {
      const juegosDesdeAPI = await obtenerJuegos()
      setJuegos(juegosDesdeAPI)
    } catch (error) {
      console.error("Error al obtener los juegos:", error)
    }
  }
  fetchJuegos()
}, [])


  const aplicarFiltros = () => {
    let filtrados = getJuegos().filter(juego => {
      return (
        (categoria === '' || juego.categoria === categoria) &&
        (plataforma === '' || juego.plataforma === plataforma) &&
        (!soloOferta || juego.oferta === true) &&
        (precioMax === '' || juego.precio <= precioMax)
      )
    })
    setJuegos(filtrados)
  }

  return (
    <section className="catalog-section">
      <h2><i className="fas fa-gamepad"></i> Catálogo de Juegos</h2>

      <div className="filters-container">
        <div className="filter-group">
          <label>
            <i className="fas fa-tags"></i> Categoría:
            <select value={categoria} onChange={e => setCategoria(e.target.value)}>
              <option value="">Todas</option>
              <option value="RPG">RPG</option>
              <option value="Acción">Acción</option>
              <option value="Metroidvania">Metroidvania</option>
              <option value="Aventura">Aventura</option>
            </select>
          </label>
        </div>

        <div className="filter-group">
          <label>
            <i className="fas fa-tv"></i> Plataforma:
            <select value={plataforma} onChange={e => setPlataforma(e.target.value)}>
              <option value="">Todas</option>
              <option value="PC">PC</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Nintendo">Nintendo</option>
            </select>
          </label>
        </div>

        <div className="filter-group">
          <label>
            <i className="fas fa-percent"></i> Solo ofertas:
            <input type="checkbox" checked={soloOferta} onChange={e => setSoloOferta(e.target.checked)} />
          </label>
        </div>

        <div className="filter-group">
          <label>
            <i className="fas fa-dollar-sign"></i> Precio máximo:
            <input
              type="number"
              value={precioMax}
              onChange={e => setPrecioMax(e.target.value ? parseFloat(e.target.value) : '')}
              placeholder="Ej: 60"
            />
          </label>
        </div>

        <button onClick={aplicarFiltros} className="btn-primary">Aplicar Filtros</button>
      </div>

      <div className="grid-catalogo">
        {juegos.map((juego, index) => (
          <GameCard key={index} juego={juego} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Catalog
