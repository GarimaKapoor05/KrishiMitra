import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Mail, Lock, User, Phone, MapPin, Tractor } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    farm_size: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Account created successfully! 🌱 Please login.');
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Unable to connect to server');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-950 dark:to-emerald-950 p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 text-white p-4 rounded-3xl">
              <Leaf size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-500">KrishiMitra</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Join the future of smart farming</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 border border-green-100 dark:border-green-900">
          <h2 className="text-3xl font-semibold text-center mb-8">Create Farmer Account</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <User size={20} />
                  <label>Full Name</label>
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600"
                  placeholder="Ramesh Patel"
                  required
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Mail size={20} />
                  <label>Email</label>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600"
                  placeholder="farmer@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Lock size={20} />
                <label>Password</label>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600"
                placeholder="Create strong password"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Phone size={20} />
                  <label>Phone Number</label>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600"
                  placeholder="98765 43210"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Tractor size={20} />
                  <label>Farm Size (hectares)</label>
                </div>
                <input
                  type="number"
                  name="farm_size"
                  value={formData.farm_size}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600"
                  placeholder="2.5"
                  step="0.1"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin size={20} />
                <label>Village / Location</label>
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-green-600"
                placeholder="Village, District, State"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-200 disabled:opacity-70 mt-4"
            >
              {loading ? 'Creating Account...' : 'Create My Farmer Account'}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;