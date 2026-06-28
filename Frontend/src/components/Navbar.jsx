import { Leaf } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Leaf className="text-brand-green" /> KrishiMitra
        </div>
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#" className="text-brand-green">Home</a>
          <a href="#">Dashboard</a>
          <a href="#">Disease AI</a>
          <a href="#">Crop Advisor</a>
        </div>
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