// frontend-EmployeeMonitor/src/pages/Login.jsx
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

  return (
    <div className="min-h-screen bg-[#050812] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0e1a] p-6 sm:p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Shield size={32} className="text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400">VexaTrade</h1>
          <p className="text-sm text-slate-400 mt-2">Employee Monitor · Secure Login</p>
          <p className="text-xs text-amber-400/60 mt-1">🔐 Employee credentials required</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Employee Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value || '')}
                className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-4 py-3 text-white outline-none focus:border-cyan-500 transition"
                placeholder="Enter your name (e.g., John)"
                required
                autoFocus
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Will login as: <span className="text-cyan-400">{employeeName || 'YourName'}@VexaTrade</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value || '')}
                className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-12 py-3 text-white outline-none focus:border-cyan-500 transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 border-t border-white/10 pt-4">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 transition">
              Register here
            </Link>
          </p>
          <p className="mt-2 text-amber-400/50">🔐 Employee credentials are separate from admin panel</p>
        </div>
      </div>
    </div>
  );
}
