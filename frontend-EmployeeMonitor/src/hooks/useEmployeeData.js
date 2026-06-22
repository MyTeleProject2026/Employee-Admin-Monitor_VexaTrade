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
        let responseData = res.data?.data || res.data;

        // Get assigned users from localStorage
        const assignedUsersStr = localStorage.getItem('assignedUsers');
        const assignedUsers = assignedUsersStr ? JSON.parse(assignedUsersStr) : [];
        const assignedUids = assignedUsers.map(u => u.uid || u);

        // If we have assigned users and the data is an array, filter it
        if (assignedUsers.length > 0 && Array.isArray(responseData)) {
          // Check if data has user_id or user_uid field
          responseData = responseData.filter(item => {
            const userUid = item.uid || item.user_uid || item.user?.uid;
            if (userUid) {
              return assignedUids.includes(userUid);
            }
            // If no uid field, check user_id
            const userId = item.user_id || item.userId;
            if (userId) {
              // We need to get user details to check uid - this is a fallback
              // Ideally your API should return uid directly
              return true; // Keep for now
            }
            return true;
          });
        }

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
