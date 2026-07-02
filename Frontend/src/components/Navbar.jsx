import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition" >
          <Leaf className="text-brand-green dark:text-emerald-400 transition-colors" />
          KrishiMitra
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 text-gray-600 dark:text-gray-300 font-medium">
          <Link to="/" className="hover:text-brand-green dark:hover:text-emerald-400 transition">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-brand-green dark:hover:text-emerald-400 transition">
            Dashboard
          </Link>

          <Link to="/disease-ai" className="hover:text-brand-green dark:hover:text-emerald-400 transition">
            Disease AI
          </Link>

          <Link
            to="/crop-prediction" className="hover:text-brand-green dark:hover:text-emerald-400 transition"
          >
            Crop Prediction
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Link to="/login" className="font-medium text-gray-900 dark:text-white hover:text-brand-green dark:hover:text-emerald-400 transition" >
            Sign in
          </Link>
          <Link to="/signup" className="bg-brand-green hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-5 py-2 rounded-full font-semibold transition" >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}