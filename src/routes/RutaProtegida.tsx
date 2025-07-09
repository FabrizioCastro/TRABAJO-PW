import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function RutaProtegida({ children }: Props) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" />
  if (user?.rol !== 'user') return <Navigate to="/admin" />
  return <>{children}</>
}
