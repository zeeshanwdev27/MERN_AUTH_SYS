
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
