import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  try {
    const token = localStorage.getItem('employeeToken') || 
                  localStorage.getItem('adminToken') || 
                  localStorage.getItem('token');
    const session = localStorage.getItem('employeeSession');
    const employeeId = localStorage.getItem('employeeId');
    const isValid = token && session && employeeId && (Date.now() - parseInt(session) < 24 * 60 * 60 * 1000);

    if (!isValid) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('employeeToken');
      localStorage.removeItem('employeeEmail');
      localStorage.removeItem('employeeName');
      localStorage.removeItem('employeeSession');
      localStorage.removeItem('employeeId');
      localStorage.removeItem('assignedUsers');
      return <Navigate to="/login" replace />;
    }
    return children;
  } catch (error) {
    console.error('ProtectedRoute error:', error);
    return <Navigate to="/login" replace />;
  }
}
