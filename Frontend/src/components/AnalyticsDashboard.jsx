import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const priceData = [
  { month: 'Jan', price: 4000 },
  { month: 'Feb', price: 3000 },
  { month: 'Mar', price: 5000 },
  { month: 'Apr', price: 2780 },
  { month: 'May', price: 6890 },
];

export default function AnalyticsDashboard() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-gray-900 dark:text-gray-100 transition-colors">

      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-3xl font-bold text-brand-green">
          Live Analytics & Forecasting
        </h2>
        <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
          📊 Simulated Data
        </span>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 -mt-6">
        Charts below use simulated data for demonstration. In production, these connect live to
        Agmarknet mandi price APIs and farm sensor feeds.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Chart 1: Price Trend Forecasting */}
        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-900 dark:text-white">Price Trend Forecast (LSTM Model)</h3>
            <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
              Demo
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
            Simulated ₹/quintal values — live model trains on Agmarknet data
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" opacity={0.25} />
                <XAxis
                dataKey="month"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={{ stroke: "#4B5563" }}
                tickLine={{ stroke: "#4B5563" }}
                />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#4B5563" }}
                  tickLine={{ stroke: "#4B5563" }}
                />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#10B981" strokeWidth={3} fill="#10B981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Chart 2: Profit Analysis */}
        <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-900 dark:text-white">Yield vs. Profit Analysis</h3>
            <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
              Demo
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
            Illustrative figures — live data integrates with farm yield records and market rates
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b7280" opacity={0.25} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#4B5563" }}
                  tickLine={{ stroke: "#4B5563" }}
                />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#4B5563" }}
                  tickLine={{ stroke: "#4B5563" }}
                />
                <Tooltip />
                <Bar dataKey="price" fill="#10B981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
