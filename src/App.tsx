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
import Perfil from './pages/Perfil'
import AdminStats from './pages/AdminStats'
import ForgotPassword from './pages/ForgotPassword'
import Noticias from './pages/Noticias'
import AdminNoticias from './pages/AdminNoticias'
import RutaProtegida from './routes/RutaProtegida'
import RutaAdmin from './routes/RutaAdmin'

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
  const usuarioActual = JSON.parse(localStorage.getItem("user") || '{}');
  console.log(usuarioActual);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar
        nombreUsuario={usuarioActual.username}
        imagenUsuario={usuarioActual.imagen}
        onLogout={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      />
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
        {/* Rutas públicas y protegidas por login */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Catalog />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verificacion" element={<Verification />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="juego/:id" element={<GameDetail />} />

          {/* Rutas que requieren autenticación */}
          <Route element={<RutaProtegida><Outlet /></RutaProtegida>}>
            <Route path="perfil" element={<Perfil />} />
            <Route path="carrito" element={<Cart />} />
            <Route path="resumen" element={<Resumen />} />
            <Route path="compras" element={<PurchaseHistory />} />
            <Route path="top-vendidos" element={<TopSelling />} />
            <Route path="top-valorados" element={<TopRated />} />
          </Route>

        </Route>

        {/* Rutas exclusivas de administrador */}
        <Route
          path="/admin"
          element={
            <RutaAdmin>
              <AdminLayout />
            </RutaAdmin>
          }
        >
          <Route index element={<AdminPanel />} />
          <Route path="juegos" element={<Juegos />} />
          <Route path="estadisticas" element={<AdminStats />} />
          <Route path="noticias" element={<AdminNoticias />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
