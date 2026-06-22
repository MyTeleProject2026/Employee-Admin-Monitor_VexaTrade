import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, UserMinus, Eye, Users, Search } from 'lucide-react';
import apiClient from '../api/client';
import StatusBadge from '../components/StatusBadge';

export default function UserManagement() {
  const navigate = useNavigate();
  const [newUserUid, setNewUserUid] = useState('');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => { loadAssignedUsers(); }, []);

  const loadAssignedUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/api/employee/assigned-users/${employeeId}`);
      if (res.data?.success) setAssignedUsers(res.data.data || []);
    } catch (err) { console.error('Failed to load assigned users:', err); }
    finally { setLoading(false); }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setAdding(true);

    const uid = typeof newUserUid === 'string' ? newUserUid.trim().toUpperCase() : '';
    if (!uid) {
      setError('Please enter a user UID');
      setAdding(false);
      return;
    }

    try {
      const res = await apiClient.post('/api/employee/add-user', { employee_id: employeeId, user_uid: uid });
      if (res.data?.success) {
        setSuccess(`User ${uid} added successfully!`);
        setNewUserUid('');
        loadAssignedUsers();
      } else {
        setError(res.data?.message || 'Failed to add user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    } finally { setAdding(false); }
  };

  const handleRemoveUser = async (userUid) => {
    if (!confirm(`Remove user ${userUid} from your monitoring list?`)) return;
    setRemoving(userUid);
    try {
      const res = await apiClient.delete('/api/employee/remove-user', { data: { employee_id: employeeId, user_uid: userUid } });
      if (res.data?.success) {
        setSuccess(`User ${userUid} removed successfully`);
        loadAssignedUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove user');
    } finally { setRemoving(null); }
  };

  const filteredUsers = assignedUsers.filter(user => {
    const uid = (user?.uid || '').toLowerCase();
    const name = (user?.name || '').toLowerCase();
    const email = (user?.email || '').toLowerCase();
    const term = (searchTerm || '').toLowerCase();
    return uid.includes(term) || name.includes(term) || email.includes(term);
  });

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-slate-400 animate-pulse">Loading users...</div></div>;

  return ( /* full JSX from earlier complete version */ );
}
