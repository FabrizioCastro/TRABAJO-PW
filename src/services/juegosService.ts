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

