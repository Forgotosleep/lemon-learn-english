import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  return localStorage.getItem('access_token') ? children : <Navigate to="/login" />;
}

