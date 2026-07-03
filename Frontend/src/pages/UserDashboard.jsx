import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Sprout,
  FlaskConical,
  Droplets,
  TrendingUp,
  Bell,
  ArrowRight,
  MapPin,
  Ruler,
  Phone,
  Calendar,
  ChevronRight,
  CloudRain,
  Thermometer,
  Wind,
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

// ── Simulated price data based on common MP crops ─────────────────────────────
const priceData = [
  { month: "Jan", soybean: 3800, wheat: 2100 },
  { month: "Feb", soybean: 3950, wheat: 2200 },
  { month: "Mar", soybean: 4100, wheat: 2050 },
  { month: "Apr", soybean: 3900, wheat: 2300 },
  { month: "May", soybean: 4200, wheat: 2400 },
  { month: "Jun", soybean: 4050, wheat: 2250 },
];

// ── Quick action modules ───────────────────────────────────────────────────────
const quickActions = [
  {
    title: "Crop Recommendation",
    desc: "Get AI crop suggestion for your soil",
    icon: Sprout,
    link: "/crop-prediction",
    status: "live",
  },
  {
    title: "Fertilizer Advisor",
    desc: "Optimize your soil nutrients",
    icon: FlaskConical,
    link: "/fertilizer-prediction",
    status: "live",
  },
  {
    title: "Irrigation Advisor",
    desc: "Schedule watering for your field",
    icon: Droplets,
    link: "/features/irrigation",
    status: "live",
  },
  {
    title: "Price Forecaster",
    desc: "Check tomorrow's mandi prices",
    icon: TrendingUp,
    link: "/features/price-prediction",
    status: "live",
  },
];
// ── Simulated recent activity ─────────────────────────────────────────────────
const recentActivity = [
  {
    type: "Crop Recommendation",
    result: "Rice recommended (92% confidence)",
    date: "Today, 10:30 AM",
    icon: Sprout,
    color: "bg-green-100 text-green-700",
  },
  {
    type: "Fertilizer Advisor",
    result: "DAP — 62 kg for 2 hectares",
    date: "Yesterday, 3:15 PM",
    icon: FlaskConical,
    color: "bg-blue-100 text-blue-700",
  },
  {
    type: "Irrigation Advisor",
    result: "Next watering: Tomorrow morning",
    date: "2 days ago",
    icon: Droplets,
    color: "bg-indigo-100 text-indigo-700",
  },
];
// ── Simulated alerts ──────────────────────────────────────────────────────────
const getAlerts = (location) => [
  {
    type: "warning",
    message: `Light rainfall expected near ${location || "your area"} in next 48 hours — delay fertilizer application.`,
    time: "2 hours ago",
  },
  {
    type: "info",
    message: `Soybean prices rising in ${location || "local"} mandi this week — good time to plan harvest sale.`,
    time: "5 hours ago",
  },
  {
    type: "success",
    message: "Optimal sowing window for Rabi crops opens in 2 weeks. Start soil preparation now.",
    time: "Yesterday",
  },
];

const alertStyles = {
  warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-300 text-amber-800 dark:text-amber-300",
  info: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 text-blue-800 dark:text-blue-300",
  success: "bg-green-50 dark:bg-green-900/20 border-green-300 text-green-700 dark:text-green-300",
};

const alertIcons = { warning: "⚠️", info: "ℹ️", success: "✅" };

// ── Component ─────────────────────────────────────────────────────────────────
export default function UserDashboard() {
  const { user } = useAuth();

  const firstName = user?.username?.split(" ")[0] || "Farmer";
  const location = user?.location || "your area";
  const farmSize = user?.farm_size || null;
  const phone = user?.phone || null;
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : null;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const alerts = getAlerts(location);

  // Extract city name from location string for mandi label
  const mandiCity = location.split(",")[0].trim();

  return (
    <div className="min-h-screen bg-[#FDFEFC] dark:bg-gray-950 pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Section 1: Welcome Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{today}</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 px-4 py-2 rounded-2xl self-start md:self-auto">
            <MapPin size={14} className="text-brand-green" />
            <span className="text-sm font-medium text-green-800 dark:text-green-300">
              {location}
            </span>
          </div>
        </motion.div>

        {/* ── Section 2: Farm Snapshot ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🌾 Your Farm Profile
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Location",
                value: location,
                icon: MapPin,
                color: "text-green-600",
                bg: "bg-green-50 dark:bg-green-900/20",
              },
              {
                label: "Farm Size",
                value: farmSize ? `${farmSize} hectares` : "Not set",
                icon: Ruler,
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-900/20",
              },
              {
                label: "Contact",
                value: phone || "Not set",
                icon: Phone,
                color: "text-purple-600",
                bg: "bg-purple-50 dark:bg-purple-900/20",
              },
              {
                label: "Member Since",
                value: joinedDate || "Recently joined",
                icon: Calendar,
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-900/20",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5"
                >
                  <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                    <Icon size={16} className={item.color} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Section 3: Quick Actions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              ⚡ Quick Actions
            </h2>
            <a
              href="/#capabilities"
              className="flex items-center gap-1 text-sm text-brand-green font-semibold hover:underline"
            >
              Explore All Modules
              <ChevronRight size={15} />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link to={action.link} key={i}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 hover:shadow-md hover:border-green-200 dark:hover:border-green-700 transition-all group h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-2">
                        <Icon size={20} className="text-brand-green" />
                      </div>
                      <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                        ✅ Live
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {action.desc}
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

        {/* ── Section 4: Recent Activity ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              🕐 Recent Activity
            </h2>
            <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full font-medium">
              Sample Data
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 -mt-4 mb-5">
            Your prediction history will appear here once saved by the backend.
          </p>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      {activity.type}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {activity.result}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    {activity.date}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Section 5: Smart Alerts ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-brand-green" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Smart Alerts
              </h2>
            </div>
            <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full font-medium">
              Simulated
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
            📍 Based on your registered location: <span className="font-medium text-gray-600 dark:text-gray-300">{location}</span> — live alerts via IMD weather API in production
          </p>
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

        {/* ── Section 6: Market Snapshot ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-brand-green" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {mandiCity} Mandi — Price Snapshot
              </h2>
            </div>
            <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full font-medium border border-amber-200 dark:border-amber-700">
              📊 Simulated Data
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            Illustrative ₹/quintal values — live data connects to Agmarknet API in production
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(val) => `₹${val}/q`} />
                <Area type="monotone" dataKey="soybean" stroke="#059669" fill="#d1fae5" name="Soybean" />
                <Area type="monotone" dataKey="wheat" stroke="#f59e0b" fill="#fef3c7" name="Wheat" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-6 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                Soybean
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                Wheat
              </span>
            </div>
            <Link
              to="/features/price-prediction"
              className="text-sm text-brand-green font-semibold hover:underline flex items-center gap-1"
            >
              Full forecast <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}