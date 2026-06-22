import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

// ✅ Employee credentials (hardcoded - separate from main admin)
const EMPLOYEE_EMAIL = 'VexaTrade@Employee';
const EMPLOYEE_PASSWORD = 'Employee@123';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(EMPLOYEE_EMAIL);
  const [password, setPassword] = useState(EMPLOYEE_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // ✅ Check against hardcoded employee credentials
    if (email === EMPLOYEE_EMAIL && password === EMPLOYEE_PASSWORD) {
      // Generate a simple token (or use a fixed one)
      const token = 'employee_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('adminToken', token);
      localStorage.setItem('token', token);
      localStorage.setItem('employeeEmail', email);
      localStorage.setItem('employeeName', 'VexaTrade Employee');
      setLoading(false);
      navigate('/dashboard');
    } else {
      setError('Invalid employee credentials. Please use the correct email and password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050812] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0e1a] p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">VexaTrade</h1>
          <p className="text-sm text-slate-400 mt-2">Employee Monitor · Secure Login</p>
          <p className="text-xs text-amber-400/60 mt-1">⚠️ Employee credentials only</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-4 py-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="Enter employee email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#050812] pl-10 pr-12 py-2.5 text-white outline-none focus:border-cyan-500"
                placeholder="Enter employee password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 border-t border-white/10 pt-4">
          <p>Employee credentials are pre-filled for demo.</p>
          <p className="mt-1 text-amber-400/50">This login is separate from the main admin panel.</p>
        </div>
      </div>
    </div>
  );
}
