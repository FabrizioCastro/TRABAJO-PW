import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './pages/MainPage'
import '../src/styles/Modal.css'
import EditarPerfil from './pages/EditarPerfil'
import CompraExitosa from './pages/CompraExitosa'
import EliminarJuego from './pages/EliminarJuego'
import AgregarJuego from './pages/AgregarJuego'
import FiltrarJuego from './pages/FiltrarJuego'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <FiltrarJuego/>
  </StrictMode>,
)
