
import { URL_BACKEND } from "../config"; 

export const UsuariosService = {

    getToken: () => {
        return localStorage.getItem("token");
    },

    getProfile: async () => {
        const token = UsuariosService.getToken();
        if (!token) throw new Error("No se encontró el token");

        const res = await fetch(`${URL_BACKEND}/usuarios/perfil`, {
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

        const res = await fetch(`${URL_BACKEND}/usuarios/perfil`, {
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

export const obtenerUsuarios = async () => {
  const resp = await fetch(`${URL_BACKEND}/usuarios`)
  if (!resp.ok) {
    throw new Error("Error al obtener usuarios")
  }
  return await resp.json()
};

export const eliminarUsuario = async (id: number) => {
    const idu = id.toString()
  const resp = await fetch(`${URL_BACKEND}/usuarios/${idu}`, {
    method: 'DELETE'
  });
  if (!resp.ok) {
    throw new Error('Error al eliminar el usuario');
  }
}
