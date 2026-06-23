// src/pages/Register.jsx
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

  return (
    <div className="min-h-screen bg-[#050812] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0e1a] p-6 sm:p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"><div className="h-16 w-16 rounded-full bg-cyan-500/20 flex items-center justify-center"><UserPlus size={32} className="text-cyan-400" /></div></div>
          <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400">VexaTrade</h1>
          <p className="text-sm text-slate-400 mt-2">Employee Registration</p>
          <p className="text-xs text-amber-400/60 mt-1">🔐 Create your employee account</p>
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
        {success && <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Employee Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value || '')} className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-4 py-3 text-white outline-none focus:border-cyan-500 transition" placeholder="Enter your name (e.g., John)" required autoFocus />
            </div>
            <p className="text-xs text-slate-500 mt-1">Your email will be: <span className="text-cyan-400">{employeeName || 'YourName'}@VexaTrade</span></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value || '')} className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-12 py-3 text-white outline-none focus:border-cyan-500 transition" placeholder="Min 6 characters" required minLength={6} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Minimum 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value || '')} className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-12 py-3 text-white outline-none focus:border-cyan-500 transition" placeholder="Confirm your password" required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60">{loading ? 'Registering...' : 'Register'}</button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 border-t border-white/10 pt-4">
          <p>Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}
