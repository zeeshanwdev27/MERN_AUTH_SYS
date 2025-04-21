import './App.css';
import SignUp from './sign-up/SignUp.jsx';
import SignIn from './sign-in/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicRoute from './components/PublicRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;    //.env.local

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          
          {/* Public routes */}
          <Route path="/" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/sign-in" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/sign-up" element={<PublicRoute><SignUp /></PublicRoute>} />

          {/* Private route */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

          {/* 404 Page Not Found */}
          <Route path="*" element={<div>Page Not Found</div>} />

        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
