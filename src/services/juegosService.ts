const BASE_URL = "http://localhost:5000"

export const obtenerJuegos = async () => {
  const resp = await fetch(`${BASE_URL}/juegos`)
  if (!resp.ok) {
    throw new Error("Error al obtener juegos")
  }
  return await resp.json()
}
