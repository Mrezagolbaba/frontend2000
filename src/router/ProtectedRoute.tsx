import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
 const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
