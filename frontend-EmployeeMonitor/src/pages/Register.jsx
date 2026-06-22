import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, UserPlus } from 'lucide-react';
import apiClient from '../api/client';
import { safeTrim } from '../utils/helpers';

export default function Register() {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const name = safeTrim(employeeName);
    if (!name || name.length < 2) {
      setError('Employee name is required (min 2 chars)');
      return;
    }

    const pass = safeTrim(password);
    if (pass.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const confirmPass = safeTrim(confirmPassword);
    if (pass !== confirmPass) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const email = `${name}@VexaTrade`;
      const res = await apiClient.post('/api/employee/register', { employee_name: name, email, password: pass });
      if (res.data?.success) {
        setSuccess(`Registration successful! Your email is ${email}`);
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setError(res.data?.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return ( /* same JSX */ );
}
