import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../api/token.js";

export default function ProtectedRoute() {
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}