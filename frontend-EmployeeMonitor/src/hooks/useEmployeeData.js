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
        
        // Use employee endpoints instead of admin endpoints
        // Replace /api/admin with /api/employee
        let employeeEndpoint = endpoint;
        if (endpoint.startsWith('/api/admin')) {
          employeeEndpoint = endpoint.replace('/api/admin', '/api/employee');
        }
        
        const res = await apiClient.get(employeeEndpoint);
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
