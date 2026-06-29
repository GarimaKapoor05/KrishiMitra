import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Leaf className="text-brand-green" />
          KrishiMitra
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-brand-green transition">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-brand-green transition">
            Dashboard
          </Link>

          <Link to="/disease-ai" className="hover:text-brand-green transition">
            Disease AI
          </Link>

          <Link
            to="/crop-prediction"
            className="hover:text-brand-green transition"
          >
            Crop Prediction
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="font-medium">Sign in</button>

          <button className="bg-brand-green text-white px-5 py-2 rounded-full font-semibold">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}