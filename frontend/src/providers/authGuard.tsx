import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/AUTH/context/AuthContext";

export function RequireAuth() {
  const { isAuthenticated } = useAuth(); // ✅ inside component
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export function RedirectIfAuth() {
  const { isAuthenticated } = useAuth(); // ✅ inside component
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
