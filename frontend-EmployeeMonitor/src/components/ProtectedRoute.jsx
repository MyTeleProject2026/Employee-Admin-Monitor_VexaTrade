import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  const session = localStorage.getItem('employeeSession');
  
  // Check if token exists and session is valid (less than 24 hours old)
  const isValid = token && session && (Date.now() - parseInt(session) < 24 * 60 * 60 * 1000);
  
  if (!isValid) {
    // Clear invalid session
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    localStorage.removeItem('employeeEmail');
    localStorage.removeItem('employeeName');
    localStorage.removeItem('employeeSession');
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
