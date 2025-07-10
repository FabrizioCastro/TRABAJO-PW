import { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import type { Game } from '../data/games';
import { obtenerJuegos, filtrarJuegosService, obtenerCategorias, obtenerPlataformas } from '../services/juegosService';
import type { Categoria, Plataforma } from '../data/models';

function Catalog() {
  const [juegos, setJuegos] = useState<Game[]>([]);
  const [categoria, setCategoria] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [fecha, setFecha] = useState('');
  const [precioMin, setPrecioMin] = useState<number | undefined>();
  const [precioMax, setPrecioMax] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const cats = await obtenerCategorias();
        setCategorias(cats);
      } catch (e) {
        console.error("Error cargando categorías", e);
      }

      try {
        const plats = await obtenerPlataformas();
        setPlataformas(plats);
      } catch (e) {
        console.error("Error cargando plataformas", e);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const juegosDesdeAPI = await obtenerJuegos();
        setJuegos(juegosDesdeAPI);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    fetchJuegos();
  }, []);

  const aplicarFiltros = async () => {
    if (precioMin !== undefined && precioMax !== undefined && precioMin > precioMax) {
      setError("El precio mínimo no puede ser mayor que el máximo");
      return;
    }

    setError(null);

    try {
      const filtros = {
        categoria,
        plataforma,
        fecha,
        precioMin,
        precioMax
      };

      const juegosFiltrados = await filtrarJuegosService(filtros);
      setJuegos(juegosFiltrados);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  return (
    <section className="catalog-section">
      <h2><i className="fas fa-gamepad"></i> Catálogo de Juegos</h2>

      <form className="container">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <select
              id="categoria"
              className="form-select w-100"
              value={categoria}
              onChange={e => setCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {categorias.map(cat => (
                <option key={cat.categoriaId} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="plataforma" className="form-label">Plataforma</label>
            <select
              id="plataforma"
              className="form-select w-100"
              value={plataforma}
              onChange={e => setPlataforma(e.target.value)}
            >
              <option value="">Todas</option>
              {plataformas.map(plat => (
                <option key={plat.plataformaId} value={plat.nombre}>
                  {plat.nombre}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="row g-3 mt-2">
          <div className="col-md-3">
            <label className="form-label">Precio mínimo</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={precioMin ?? ""}
              min={0}
              step={0.01}
              onChange={e => setPrecioMin(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Mínimo"
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Precio máximo</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={precioMax ?? ""}
              min={0}
              step={0.01}
              onChange={e => setPrecioMax(e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Máximo"
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col text-end">
            <button type="button" onClick={aplicarFiltros} className="btn btn-primary">
              Aplicar Filtros
            </button>
          </div>
        </div>
      </form>

      <div className="grid-catalogo">
        {juegos.map((juego, index) => (
          <GameCard key={index} juego={juego} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Catalog;
