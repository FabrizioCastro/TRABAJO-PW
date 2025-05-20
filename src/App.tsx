// src/App.tsx
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import GameCarousel from './components/Carousel'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Resumen from './pages/Resumen'
import PurchaseHistory from './pages/PurchaseHistory'
import AdminPanel from './pages/AdminPanel'
import TopSelling from './pages/TopSelling'
import TopRated from './pages/TopRated'
import Verification from './pages/Verification'
import GameDetail from './pages/GameDetail'
import { AuthProvider } from './context/AuthContext'
import NavBar from './components/Navbar'
import Juegos from './pages/Juegos'

// Layout para usuario normal
function AppLayout() {
  return (
    <>
      <Header />
      <GameCarousel />
      <main style={{ minHeight: '80vh', padding: '2rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

// Layout para admin 
function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />
      <main style={{ flexGrow: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas con AppLayout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Catalog />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="resumen" element={<Resumen />} />
          <Route path="compras" element={<PurchaseHistory />} />
          <Route path="top-vendidos" element={<TopSelling />} />
          <Route path="top-valorados" element={<TopRated />} />
          <Route path="verificacion" element={<Verification />} />
          <Route path="juego/:id" element={<GameDetail />} />
        </Route>

        {/* Rutas admin con AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPanel />} />
          <Route path="juegos" element={<Juegos />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
