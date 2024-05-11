import useAuth from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, isInitialized } = useAuth();
  const location = useLocation();

  localStorage.setItem("active-route", location.pathname + location.hash);
  if (!isLoggedIn && !isInitialized) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
