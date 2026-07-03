import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Mail, Lock } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Welcome back to KrishiMitra 🌱');
        navigate('/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Unable to connect to server');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-950 dark:to-emerald-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 text-white p-4 rounded-3xl">
              <Leaf size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-500">KrishiMitra</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Smart Farming, Better Future</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-green-100 dark:border-green-900">
          <h2 className="text-3xl font-semibold text-center mb-8">Welcome Back</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Mail size={20} />
                <label>Email</label>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600 transition-colors"
                placeholder="farmer@example.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Lock size={20} />
                <label>Password</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 disabled:opacity-70"
            >
              {loading ? 'Logging in...' : 'Login to KrishiMitra'}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            New to KrishiMitra?{' '}
            <Link to="/register" className="text-green-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;