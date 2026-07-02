import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center
      bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-6xl font-black leading-tight text-gray-900 dark:text-white">
          Precision Agriculture,{" "}
          <span className="text-brand-green dark:text-emerald-400">
            Optimized.
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 mb-8">
          KrishiMitra integrates real-time soil data, hyper-local weather, and
          market trends to ensure every acre is profitable and sustainable.
        </p>

        <div className="flex gap-4">
          <Link to="/dashboard">
            <button className="bg-brand-green text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition">
              View Dashboard
            </button>
          </Link>

          <a href="/#capabilities">
            <button className="border border-gray-300 dark:border-gray-700 px-8 py-4 rounded-xl font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              Explore Features
            </button>
          </a>
        </div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-700 transition-colors"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            Farm Metrics Dashboard
          </h3>

          <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
            📊 Sample Data
          </span>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5 -mt-3">
          Live values update from IoT sensors in production
        </p>

        <div className="space-y-6">
          {[
            { label: "Soil Moisture", value: "64%", color: "text-blue-600 dark:text-blue-400" },
            { label: "Optimal Sowing Date", value: "Oct 12", color: "text-brand-green dark:text-emerald-400" },
            { label: "Price Trend", value: "+12.4%", color: "text-emerald-600 dark:text-emerald-400" }
          ].map((m, i) => (
            <div key={i} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
              <span className="text-gray-500 dark:text-gray-400">{m.label}</span>
              <span className={`font-black ${m.color}`}>{m.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}