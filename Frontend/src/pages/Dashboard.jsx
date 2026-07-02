import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sprout,
  FlaskConical,
  Droplets,
  Bug,
  TrendingUp,
  BookOpen,
  Mic,
  CloudRain,
  Thermometer,
  Wind,
  Bell,
  ArrowRight,
  BarChart2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ── Sample data (clearly labeled as demo throughout) ──────────────────────────

const priceData = [
  { month: "Jan", wheat: 2100, rice: 3200 },
  { month: "Feb", wheat: 2400, rice: 3000 },
  { month: "Mar", wheat: 2200, rice: 3800 },
  { month: "Apr", wheat: 2900, rice: 3500 },
  { month: "May", wheat: 3100, rice: 4100 },
  { month: "Jun", wheat: 2800, rice: 3900 },
];

const modules = [
  {
    title: "Crop Recommendation",
    desc: "Get AI-powered crop suggestions for your soil.",
    icon: Sprout,
    link: "/crop-prediction",
    status: "live",
  },
  {
    title: "Fertilizer Advisor",
    desc: "Optimize nutrients and reduce input costs.",
    icon: FlaskConical,
    link: "/fertilizer-prediction",
    status: "live",
  },
  {
    title: "Irrigation Advisor",
    desc: "Schedule watering based on soil moisture.",
    icon: Droplets,
    link: "/features/irrigation",
    status: "live",
  },
  {
    title: "Disease Detection",
    desc: "Upload a leaf image for instant AI diagnosis.",
    icon: Bug,
    link: "/disease-ai",
    status: "coming",
  },
  {
    title: "Price Forecaster",
    desc: "LSTM-powered market price predictions.",
    icon: TrendingUp,
    link: "/features/price-prediction",
    status: "coming",
  },
  {
    title: "Farm Records",
    desc: "Secure, blockchain-ready documentation.",
    icon: BookOpen,
    link: "/features/records",
    status: "coming",
  },
  {
    title: "Voice Assistant",
    desc: "Hands-free multilingual farming support.",
    icon: Mic,
    link: "/features/voice-assistant",
    status: "coming",
  },
];

const alerts = [
  {
    type: "warning",
    message: "Soil moisture dropping below optimal for wheat. Consider irrigation in next 48 hours.",
    time: "2 hours ago",
  },
  {
    type: "info",
    message: "Rice prices up 8.4% in Bhopal mandi this week — good time to plan harvest sale.",
    time: "5 hours ago",
  },
  {
    type: "success",
    message: "Fertilizer application window open for maize crops in your region.",
    time: "Yesterday",
  },
  {
    type: "warning",
    message: "Light rainfall expected over next 3 days — delay pesticide application.",
    time: "Yesterday",
  },
];

const alertStyles = {
  warning: "bg-amber-50 border-amber-300 text-amber-800",
  info: "bg-blue-50 border-blue-300 text-blue-800",
  success: "bg-green-50 border-green-300 text-green-700",
};

const alertIcons = {
  warning: "⚠️",
  info: "ℹ️",
  success: "✅",
};

const stats = [
  { label: "Farmers to Reach", value: "120K+" },
  { label: "Water Reduction Target", value: "38%" },
  { label: "CO2 Offset Goal", value: "2.4M t" },
  { label: "Detection Accuracy", value: "94%" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#FDFEFC] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Good morning, Farmer 👋
            </h1>
            <p className="text-gray-500 mt-1">{today}</p>
          </div>
          <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 self-start md:self-auto">
            📊 Platform Overview — Demo View
          </span>
        </motion.div>

        {/* ── Weather + Alerts row ── */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Weather snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Today's Weather</h2>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                Sample
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-5">
              Live data connects to IMD weather API in production
            </p>
            <div className="space-y-4">
              {[
                { icon: Thermometer, label: "Temperature", value: "28°C", color: "text-orange-500" },
                { icon: Droplets, label: "Humidity", value: "72%", color: "text-blue-500" },
                { icon: CloudRain, label: "Rainfall", value: "4mm expected", color: "text-indigo-500" },
                { icon: Wind, label: "Wind Speed", value: "14 km/h", color: "text-gray-500" },
              ].map((w, i) => {
                const Icon = w.icon;
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Icon size={16} className={w.color} />
                      <span className="text-sm">{w.label}</span>
                    </div>
                    <span className={`font-bold text-sm ${w.color}`}>{w.value}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-brand-green" />
                <h2 className="font-bold text-lg">Smart Alerts</h2>
              </div>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                Simulated
              </span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`border-l-4 px-4 py-3 rounded-lg text-sm ${alertStyles[alert.type]}`}
                >
                  <span className="mr-2">{alertIcons[alert.type]}</span>
                  {alert.message}
                  <span className="block text-xs opacity-60 mt-1">{alert.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Module shortcuts ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🌾 Platform Modules
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <Link to={mod.link} key={i}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-green-200 transition-all group h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-green-50 rounded-xl p-2">
                        <Icon size={20} className="text-brand-green" />
                      </div>
                      {mod.status === "live" ? (
                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          ✅ Live
                        </span>
                      ) : (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          🔧 Soon
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {mod.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-brand-green text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Open <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* ── Price trend chart ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <BarChart2 size={20} className="text-brand-green" />
              <h2 className="font-bold text-lg">Crop Price Trends</h2>
            </div>
            <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
              📊 Simulated Data
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-6">
            Illustrative ₹/quintal values — live model connects to Agmarknet mandi price API
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(val) => `₹${val}/q`} />
                <Area
                  type="monotone"
                  dataKey="wheat"
                  stroke="#f59e0b"
                  fill="#fef3c7"
                  name="Wheat"
                />
                <Area
                  type="monotone"
                  dataKey="rice"
                  stroke="#059669"
                  fill="#d1fae5"
                  name="Rice"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4 justify-center text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              Wheat
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Rice
            </span>
          </div>
        </motion.div>

        {/* ── Platform stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-brand-green rounded-3xl p-8 text-white"
        >
          <p className="text-center text-emerald-200 text-xs font-semibold uppercase tracking-widest mb-6">
            🎯 Platform Goals & Projected Impact
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-emerald-100 uppercase tracking-widest text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}