import useAuth from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { logout } = useAuth();
  const { signupFinished } = useAppSelector(
    (state) => state.user,
  );
  const { isLoggedIn, isInitialized } = useAuth();
  const location = useLocation();
  localStorage.setItem("active-route", location.pathname + location.hash);
  
  if (!signupFinished) {
    logout();
    return <Navigate to="/register" replace />;
  }
  if (!isLoggedIn && !isInitialized) {
    logout();
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
