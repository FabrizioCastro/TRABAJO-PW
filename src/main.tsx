import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './pages/MainPage'
import '../src/styles/Modal.css'
import EditarPerfil from './pages/EditarPerfil'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <EditarPerfil/>
  </StrictMode>,
)
