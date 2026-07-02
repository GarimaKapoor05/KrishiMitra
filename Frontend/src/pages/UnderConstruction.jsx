import { Construction, ArrowLeft, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-900 transition-colors duration-300 flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-2xl p-10 text-center"
      >

        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-8">
          <Construction
            size={48}
            className="text-brand-green dark:text-emerald-400"
          />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-semibold mb-6">
          <Clock3 size={16} />
          Coming Soon
        </span>

        {/* Title */}
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-5">
          This Feature is Under Construction
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-8 mb-8">
          We're currently building secure authentication for KrishiMitra.
          Sign Up and Login will be available in a future update.
        </p>

        {/* Info Box */}
        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-5 mb-8">
          <p className="text-emerald-800 dark:text-emerald-300">
            🌱 The AI farming modules are already available for demonstration.
            Feel free to explore Crop Prediction, Fertilizer Recommendation,
            Disease Detection, Smart Irrigation, and Market Price Forecasting.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-7 py-3 rounded-xl font-semibold transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Explore Dashboard
          </Link>

        </div>

      </motion.div>

    </div>
  );
}