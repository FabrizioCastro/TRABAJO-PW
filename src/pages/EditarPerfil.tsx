import React, { useState, useEffect } from "react"
import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Titulo from "../components/Titulo"
import Modal from "../components/Modal"
import { UsuariosService } from "../services/usuariosService"
import MensajeEstado from "../components/MensajeEstado";

interface EditarPerfilProps {
  onCerrar: () => void
}

const EditarPerfil = ({ onCerrar }: EditarPerfilProps) => {
  const [primerNombre, setPrimerNombre] = useState("")
  const [segundoNombre, setSegundoNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [imagen, setImagen] = useState<string | undefined>(undefined)
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'exito'; texto: string } | null>(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const user = await UsuariosService.getProfile()
        if (user.username) {
          const [first, second] = user.username.split(" ")
          setPrimerNombre(first || "")
          setSegundoNombre(second || "")
          setCorreo(user.email || "")
          setImagen(user.imagen)
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error)
        setMensaje({ tipo: 'error', texto: 'No se pudo actualizar el perfil' })
      }
    }

    cargarPerfil()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fullName = `${primerNombre} ${segundoNombre}`.trim()

    try {
      await UsuariosService.updateProfile({
        username: fullName,
        email: correo,
        imagen,
      })
      setMensaje({ tipo: 'exito', texto: 'Perfil actualizado correctamente' });
      setTimeout(() => {
        setMensaje(null);
        onCerrar();
      }, 2000);
      onCerrar()
    } catch (error) {
      console.error("Error al actualizar el perfil:", error)
      setMensaje({ tipo: 'error', texto: 'No se pudo actualizar el perfil' });
    }
  }
  return (
    <Modal>
      <Titulo texto="Edita la información de tu perfil" />
      <ImgPerfil
        imagen={imagen}
        onImagenChange={(nuevaImagen) => setImagen(nuevaImagen)}
      />

      <Formulario onSubmit={handleSubmit}>
        <label htmlFor="primerNombre">Primer Nombre</label>
        <input
          type="text"
          id="primerNombre"
          name="primerNombre"
          value={primerNombre}
          onChange={e => setPrimerNombre(e.target.value)}
        />

        <label htmlFor="segundoNombre">Segundo Nombre</label>
        <input
          type="text"
          id="segundoNombre"
          name="segundoNombre"
          value={segundoNombre}
          onChange={e => setSegundoNombre(e.target.value)}
        />

        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
        />

        {mensaje && (
          <MensajeEstado tipo={mensaje.tipo} mensaje={mensaje.texto} onCerrar={() => setMensaje(null)} />
        )}

        <div className="row-btn1">
          <Boton tipo="button" texto="Cancelar" onClick={onCerrar} />
          <Boton tipo="submit" texto="Guardar" />
        </div>
      </Formulario>
    </Modal>
  )
}

export default EditarPerfil
