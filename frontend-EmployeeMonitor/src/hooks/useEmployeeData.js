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
        // Handle both { success: true, data: ... } and direct array responses
        const responseData = res.data?.data || res.data;
        setData(responseData);
        setError(null);
      } catch (err) {
        console.error(`[useEmployeeData] Error fetching ${endpoint}:`, err);
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
