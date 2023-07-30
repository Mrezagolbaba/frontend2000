import { Navigate,} from 'react-router-dom';

interface ProtectedRouteProps {
  user: boolean;
  children: any;
}

const ProtectedRoute = ({ user, children }:ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;