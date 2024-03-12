import useAuth from "hooks/useAuth";
import { Navigate } from "react-router-dom";

const AuthRouter = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default AuthRouter;
