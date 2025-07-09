import { URL_BACKEND } from "../config"; 

export const VentasService = {
    getToken: () => {
        return localStorage.getItem("token");
    },

    comprarJuegos: async (juegos: { juegoId: number; cantidad: number }[]) => {
        const token = VentasService.getToken();

        const response = await fetch(`${URL_BACKEND}/ventas/comprar`, {
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
    },

   generarClaves: async (juegoId: number, cantidad: number) => {
        const token = VentasService.getToken();

        const response = await fetch(`${URL_BACKEND}/claves/generar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ juegoId, cantidad })
        });

        if (!response.ok) {
            throw new Error("Error al generar claves");
        }

        return await response.json();
    }
};
