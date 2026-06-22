import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://vexatrade-server.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;