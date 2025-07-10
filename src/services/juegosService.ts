import type { Game } from "../data/games"

import { URL_BACKEND } from "../config";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};


export const obtenerJuegos = async () => {
  const resp = await fetch(`${URL_BACKEND}/juegos`)
  if (!resp.ok) {
    throw new Error("Error al obtener juegos")
  }
  return await resp.json()
}

export const obtenerJuegosMasValorados = async (): Promise<Game[]> => {
  const resp = await fetch(`${URL_BACKEND}/juegos/api/juegos/mas-valorados`, {
    headers: getAuthHeaders(),
  });

  if (!resp.ok) {
    throw new Error("Error al obtener juegos más valorados");
  }

  return await resp.json();
};
export const obtenerRankingJuegos = async () => {
  const response = await fetch(`${URL_BACKEND}/juegos/ranking`);
  if (!response.ok) {
    throw new Error("Error al obtener el ranking de juegos");
  }
  return await response.json();
};

export const eliminarJuego = async (id: number) => {
  const resp = await fetch(`${URL_BACKEND}/juegos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!resp.ok) {
    throw new Error('Error al eliminar el juego');
  }
};

export const agregarJuego = async (juego: any) => {
  const resp = await fetch(`${URL_BACKEND}/juegos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(juego),
  })
  return await resp.json()
}


export const obtenerCategorias = async () => {
  const resp = await fetch(`${URL_BACKEND}/juegos/categorias`);
  if (!resp.ok) throw new Error("Error al obtener categorías");
  return await resp.json();
};

export const obtenerPlataformas = async () => {
  const resp = await fetch(`${URL_BACKEND}/juegos/plataformas`);
  if (!resp.ok) throw new Error("Error al obtener plataformas");
  return await resp.json();
};


export const obtenerJuegoPorId = async (id: number) => {
  const resp = await fetch(`${URL_BACKEND}/juegos/${id}`);
  if (!resp.ok) throw new Error("Error al obtener el juego");
  return await resp.json();
};

export const editarJuego = async (juego: Game): Promise<Game> => {
  try {
    const response = await fetch(`${URL_BACKEND}/juegos/${juego.id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(juego),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el juego");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en editarJuego (frontend):", error);
    throw error;
  }
};

interface FiltroParams {
  categoria?: string;
  fecha?: string;
  precioMin?: number;
  precioMax?: number;
  plataforma?: string;
}

export const filtrarJuegosService = async (filtros: FiltroParams): Promise<Game[]> => {
  const params = new URLSearchParams();

  if (filtros.categoria) params.append("categoria", filtros.categoria);
  if (filtros.plataforma) params.append("plataforma", filtros.plataforma);
  if (filtros.fecha) params.append("fecha", filtros.fecha);
  if (filtros.precioMin !== undefined) params.append("precioMin", filtros.precioMin.toString());
  if (filtros.precioMax !== undefined) params.append("precioMax", filtros.precioMax.toString());

  try {
    const response = await fetch(`${URL_BACKEND}/juegos/filtrar?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Error al filtrar juegos");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en filtrarJuegosService:", error);
    throw error;
  }

};


export const buscarJuegosPorNombre = async (nombre: string): Promise<Game[]> => {
  const resp = await fetch(
    `${URL_BACKEND}/juegos/search?nombre=${encodeURIComponent(nombre)}`,
    {
      headers: getAuthHeaders()
    }
  )
  if (!resp.ok) {
    throw new Error("Error al buscar juegos por nombre")
  }
  return await resp.json()
}