// src/App.tsx
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import OrderSummary from './pages/OrderSummary'
import PurchaseHistory from './pages/PurchaseHistory'
import AdminPanel from './pages/AdminPanel'
import TopSelling from './pages/TopSelling'
import TopRated from './pages/TopRated'
import Verification from './pages/Verification'
import GameDetail from './pages/GameDetail'
import { AuthProvider } from './context/AuthContext'

function AppLayout() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', padding: '2rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Catalog />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="resumen" element={<OrderSummary />} />
          <Route path="compras" element={<PurchaseHistory />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="top-vendidos" element={<TopSelling />} />
          <Route path="top-valorados" element={<TopRated />} />
          <Route path="verificacion" element={<Verification />} />
          <Route path="juego/:id" element={<GameDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
