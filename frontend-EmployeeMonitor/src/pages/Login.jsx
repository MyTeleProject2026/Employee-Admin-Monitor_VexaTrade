import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
import apiClient from '../api/client';
import { safeTrim } from '../utils/helpers';

export default function Login() {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('employeeToken');
      localStorage.removeItem('employeeEmail');
      localStorage.removeItem('employeeName');
      localStorage.removeItem('employeeSession');
      localStorage.removeItem('employeeId');
      localStorage.removeItem('assignedUsers');
    } catch (e) { /* ignore */ }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const name = safeTrim(employeeName);
    if (!name) {
      setError('Please enter your employee name');
      setLoading(false);
      return;
    }

    const pass = safeTrim(password);
    if (!pass) {
      setError('Please enter your password');
      setLoading(false);
      return;
    }

    const email = `${name}@VexaTrade`;

    try {
      const res = await apiClient.post('/api/employee/login', { email, password: pass });
      if (res.data?.success) {
        const data = res.data.data;
        localStorage.setItem('employeeToken', data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('employeeEmail', data.email);
        localStorage.setItem('employeeName', data.employee_name);
        localStorage.setItem('employeeId', data.id);
        localStorage.setItem('assignedUsers', JSON.stringify(data.assigned_users || []));
        localStorage.setItem('employeeSession', Date.now().toString());
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return ( /* same JSX, no changes needed */ );
}
