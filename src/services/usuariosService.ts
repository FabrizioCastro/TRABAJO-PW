
const BASE_URL = "http://localhost:5000";

export const UsuariosService = {

    getToken: () => {
        return localStorage.getItem("token");
    },

    getProfile: async () => {
        const token = UsuariosService.getToken();
        if (!token) throw new Error("No se encontró el token");

        const res = await fetch(`${BASE_URL}/usuarios/perfil`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Error al obtener el perfil:", text);
            throw new Error("Error al obtener el perfil");
        }

        return res.json();
    },

    updateProfile: async (datosActualizados: { username?: string; email?: string; imagen?: string }) => {
        const token = UsuariosService.getToken();
        if (!token) throw new Error("No se encontró el token");

        const res = await fetch(`${BASE_URL}/usuarios/perfil`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(datosActualizados),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Error al actualizar el perfil:", text);
            throw new Error("Error al actualizar el perfil");
        }

        return res.json();
    },

};
