import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://vexatrade-server.onrender.com';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  // Try employee token first, then admin token (for backwards compatibility)
  const token = localStorage.getItem('employeeToken') || 
                localStorage.getItem('adminToken') || 
                localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Clear all tokens and session data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('employeeToken');
      localStorage.removeItem('employeeEmail');
      localStorage.removeItem('employeeName');
      localStorage.removeItem('employeeSession');
      localStorage.removeItem('employeeId');
      localStorage.removeItem('assignedUsers');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
