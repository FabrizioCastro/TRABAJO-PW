const BASE_URL = "http://localhost:5000"

export const obtenerJuegos = async () => {
  const resp = await fetch(`${BASE_URL}/juegos`)
  if (!resp.ok) {
    throw new Error("Error al obtener juegos")
  }
  return await resp.json()
}

export const eliminarJuego = async (id: number) => {
    const resp = await fetch(`${BASE_URL}/juegos/${id}`, {
        method: 'DELETE'
    });
    if (!resp.ok) {
        throw new Error('Error al eliminar el juego');
    }
};

export const agregarJuego = async (juego: any) => {
  const resp = await fetch(`${BASE_URL}/juegos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(juego),
  })
  return await resp.json()
}


export const obtenerCategorias = async () => {
  const resp = await fetch(`${BASE_URL}/juegos/categorias`);
  if (!resp.ok) throw new Error("Error al obtener categorías");
  return await resp.json();
};

export const obtenerPlataformas = async () => {
  const resp = await fetch(`${BASE_URL}/juegos/plataformas`);
  if (!resp.ok) throw new Error("Error al obtener plataformas");
  return await resp.json();
};

