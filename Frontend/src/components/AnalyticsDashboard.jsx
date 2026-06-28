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
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-brand-green">Live Analytics & Forecasting</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart 1: Price Trend Forecasting */}
        <motion.div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <h3 className="font-bold mb-6">Price Trend Forecast (LSTM Model)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#059669" fill="#d1fae5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Chart 2: Profit Analysis */}
        <motion.div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <h3 className="font-bold mb-6">Yield vs. Profit Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}