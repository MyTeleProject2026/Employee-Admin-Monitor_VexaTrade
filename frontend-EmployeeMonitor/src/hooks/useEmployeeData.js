import { useEffect, useState } from 'react';
import apiClient from '../api/client';

export function useEmployeeData(endpoint, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(endpoint);
        setData(res.data?.data || res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [endpoint, ...dependencies]);
  
  return { data, loading, error };
}