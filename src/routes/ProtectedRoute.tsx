import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext.tsx";

interface Props {
  children: ReactNode;
  role?: "teacher" | "student"; // opcional para proteger por rol
}

export default function ProtectedRoute({ children, role }: Props) {
  const { token, user } = useAuth();

  // ❌ No autenticado
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ No tiene el rol requerido
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  // ✅ Acceso permitido
  return <>{children}</>;
}