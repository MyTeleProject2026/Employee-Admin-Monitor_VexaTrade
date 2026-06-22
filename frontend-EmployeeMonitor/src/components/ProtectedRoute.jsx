import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  const session = localStorage.getItem('employeeSession');
  const employeeId = localStorage.getItem('employeeId');

  // Check if token exists and session is valid (less than 24 hours old)
  const isValid = token && session && employeeId && (Date.now() - parseInt(session) < 24 * 60 * 60 * 1000);

  if (!isValid) {
    // Clear invalid session
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    localStorage.removeItem('employeeEmail');
    localStorage.removeItem('employeeName');
    localStorage.removeItem('employeeSession');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('assignedUsers');
    return <Navigate to="/login" replace />;
  }

  return children;
}
