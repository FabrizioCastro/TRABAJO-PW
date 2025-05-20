import React, { useState } from "react"
import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Modal from "../components/Modal"
import Titulo from "../components/Titulo"
import { usuarios } from "../data/usuarios"

const EditarPerfil = () => {
  const primerUsuario = usuarios[0]

  const [primerNombre, setPrimerNombre] = useState(primerUsuario.name.split(' ')[0] || "")
  const [segundoNombre, setSegundoNombre] = useState(primerUsuario.name.split(' ')[1] || "")
  const [correo, setCorreo] = useState(primerUsuario.email)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos editados:", { primerNombre, segundoNombre, correo })
  }

  return (
    <Modal>
      <div >
        <Titulo texto="Edita la información de tu perfil" />
        <ImgPerfil imagen={primerUsuario.imagen} />
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
          
          <Boton tipo="submit" texto="Edita información" />
        </Formulario>
      </div>
    </Modal>
  )
}

export default EditarPerfil


{/* import React, { useState, useEffect } from "react"
import Boton from "../components/Boton"
import Formulario from "../components/Formulario"
import ImgPerfil from "../components/ImgUsuario"
import Modal from "../components/Modal"
import Titulo from "../components/Titulo"

const EditarPerfil = () => {
  const [primerNombre, setPrimerNombre] = useState("")
  const [segundoNombre, setSegundoNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [imagen, setImagen] = useState<string | undefined>(undefined)

  useEffect(() => {
    const storedUsers = localStorage.getItem("usuarios")
    if (storedUsers) {
      const usersArray = JSON.parse(storedUsers)
      const user = usersArray[0]

      if (user && user.name) {
        const [first, second] = user.name.split(" ")
        setPrimerNombre(first || "")
        setSegundoNombre(second || "")
        setCorreo(user.email || "")
        setImagen(user.imagen)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullName = `${primerNombre} ${segundoNombre}`.trim()

    const storedUsers = localStorage.getItem("usuarios")

    if (storedUsers) {
      const usersArray = JSON.parse(storedUsers)

      if (usersArray.length > 0) {
        usersArray[0] = {
          ...usersArray[0],
          name: fullName,
          email: correo,
          imagen: imagen,
          password: usersArray[0].password || "48690",
        }

        localStorage.setItem("usuarios", JSON.stringify(usersArray))
        console.log("Usuario actualizado:", usersArray[0])
      }
    }
  }

  return (
    <Modal>
      <div>
        <Titulo texto="Edita la información de tu perfil" />
        <ImgPerfil
          nombre={primerNombre}
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

          <Boton tipo="submit" texto="Edita información" />
        </Formulario>
      </div>
    </Modal>
  )
}

export default EditarPerfil
*/}