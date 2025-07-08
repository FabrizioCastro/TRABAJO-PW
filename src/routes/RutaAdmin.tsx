import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react"; 

interface Props {
  children: ReactNode;
}

export default function RutaAdmin({ children }: Props) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.rol !== "admin") return <Navigate to="/" />;
  
  return <>{children}</>;
}
