const BASE_URL = "http://localhost:5000"; 
export const VentasService = {
  getToken: () => {
    return localStorage.getItem("token");
  },

  comprarJuegos: async (juegos: { juegoId: number; cantidad: number }[]) => {
    const token = VentasService.getToken();

    const response = await fetch(`${BASE_URL}/ventas/comprar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ juegos })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al procesar la compra");
    }

    return await response.json(); 
  }
};
