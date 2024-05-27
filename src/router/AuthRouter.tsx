import useAuth from "hooks/useAuth";
import { Navigate } from "react-router-dom";

const AuthRouter = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    const route = localStorage.getItem("active-route") || "/dashboard";
    return <Navigate to={route} />;
  }
  return children;
};

export default AuthRouter;
