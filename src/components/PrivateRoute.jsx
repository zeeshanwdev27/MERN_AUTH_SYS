import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem('token');
  console.log("TOKEN SAVED:", token);
  return token ? children : <Navigate to="/sign-in" replace/>;
};

export default PrivateRoute;
