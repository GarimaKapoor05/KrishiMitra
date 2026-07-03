import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, Phone, MapPin, Tractor, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from "../config";

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
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/user-dashboard', { replace: true });
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
    }

    setLoading(false);
  };

  const fields = [
    {
      name: 'username',
      label: 'Full Name',
      type: 'text',
      icon: User,
      placeholder: 'Ramesh Patel',
      required: true,
      colSpan: 1,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      icon: Mail,
      placeholder: 'farmer@example.com',
      required: true,
      colSpan: 1,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      icon: Lock,
      placeholder: '••••••••',
      required: true,
      colSpan: 2,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      icon: Phone,
      placeholder: '+91 98765 43210',
      required: false,
      colSpan: 1,
    },
    {
      name: 'farm_size',
      label: 'Farm Size (hectares)',
      type: 'number',
      icon: Tractor,
      placeholder: '2.5',
      required: false,
      colSpan: 1,
    },
    {
      name: 'location',
      label: 'Village / Location',
      type: 'text',
      icon: MapPin,
      placeholder: 'Village, District, State',
      required: false,
      colSpan: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFC] dark:bg-gray-950 flex items-center justify-center px-6 py-20 relative">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="w-full max-w-lg relative z-10">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <Link to="/" className="inline-flex flex-col items-center gap-3">
            <div className="bg-brand-green text-white p-4 rounded-3xl shadow-lg">
              <Leaf size={36} />
            </div>
            <h1 className="text-3xl font-extrabold text-brand-green">
              KrishiMitra
            </h1>
          </Link>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Join the future of smart farming
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Create your account 🌱
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Set up your farmer profile to get started.
          </p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl mb-6 text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}

          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map((field) => {
                const Icon = field.icon;
                return (
                  <div
                    key={field.name}
                    className={field.colSpan === 2 ? 'md:col-span-2' : ''}
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-brand-green dark:bg-gray-800 transition">
                      <Icon size={18} className="text-gray-400 mr-3 shrink-0" />
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        step={field.name === 'farm_size' ? '0.1' : undefined}
                        className="w-full outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-brand-green hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create My Farmer Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>

          <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-green font-semibold hover:underline">
              Login here
            </Link>
          </p>

        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <Link to="/" className="text-sm text-gray-400 hover:text-brand-green transition">
            ← Back to home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

export default Register;