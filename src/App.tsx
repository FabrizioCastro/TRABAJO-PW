// src/App.tsx
import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/resumen" element={<OrderSummary />} />
          <Route path="/compras" element={<PurchaseHistory />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/top-vendidos" element={<TopSelling />} />
          <Route path="/top-valorados" element={<TopRated />} />
          <Route path="/verificacion" element={<Verification />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
