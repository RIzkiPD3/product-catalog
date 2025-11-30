import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isAuthenticated = false; // nanti diganti dari AuthContext

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
