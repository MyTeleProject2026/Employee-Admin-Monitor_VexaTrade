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
        setError(null);
        let employeeEndpoint = endpoint;
        if (endpoint.startsWith('/api/admin')) {
          employeeEndpoint = endpoint.replace('/api/admin', '/api/employee');
        }
        console.log(`[useEmployeeData] Fetching: ${employeeEndpoint}`);
        const res = await apiClient.get(employeeEndpoint);
        let responseData = res.data?.data !== undefined ? res.data.data : res.data;
        if (responseData === null || responseData === undefined) {
          responseData = Array.isArray(responseData) ? [] : {};
        }
        setData(responseData);
      } catch (err) {
        console.error(`[useEmployeeData] Error:`, err);
        setError(err.response?.data?.message || err.message || 'Failed to load data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, ...dependencies]);

  return { data, loading, error };
}
