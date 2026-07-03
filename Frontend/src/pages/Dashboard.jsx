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
import { useTranslation } from "react-i18next";

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
    titleKey: "crop_recommendation",
    descKey: "crop_recommendation_desc",
    icon: Sprout,
    link: "/crop-prediction",
    status: "live",
  },
  {
    titleKey: "fertilizer_advisor",
    descKey: "fertilizer_advisor_desc",
    icon: FlaskConical,
    link: "/fertilizer-prediction",
    status: "live",
  },
  {
    titleKey: "irrigation_advisor",
    descKey: "irrigation_advisor_desc",
    icon: Droplets,
    link: "/features/irrigation",
    status: "live",
  },
  {
    titleKey: "price_forecaster",
    descKey: "price_forecaster_desc",
    icon: TrendingUp,
    link: "/features/price-prediction",
    status: "live",
  },
  {
    titleKey: "disease_detection",
    descKey: "disease_detection_desc",
    icon: Bug,
    link: "/disease-ai",
    status: "coming",
  },
  {
    titleKey: "farm_records",
    descKey: "farm_records_desc",
    icon: BookOpen,
    link: "/features/records",
    status: "coming",
  },
  {
    titleKey: "voice_assistant",
    descKey: "voice_assistant_desc",
    icon: Mic,
    link: "/features/voice-assistant",
    status: "coming",
  },
];

const alerts = [
  {
    type: "warning",
    messageKey: "alert_soil_moisture",
    timeKey: "time_2_hours_ago",
  },
  {
    type: "info",
    messageKey: "alert_rice_prices",
    timeKey: "time_5_hours_ago",
  },
  {
    type: "success",
    messageKey: "alert_fertilizer_window",
    timeKey: "time_yesterday",
  },
  {
    type: "warning",
    messageKey: "alert_rainfall",
    timeKey: "time_yesterday",
  },
];

const alertStyles = {
  warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-600 text-amber-800 dark:text-amber-300",
  info: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 text-blue-800 dark:text-blue-300",
  success: "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600 text-green-700 dark:text-green-300",
};

const alertIcons = {
  warning: "⚠️",
  info: "ℹ️",
  success: "✅",
};

const stats = [
  { labelKey: "farmers_to_reach", value: "120K+" },
  { labelKey: "water_reduction_target", value: "38%" },
  { labelKey: "co2_offset_goal", value: "2.4M t" },
  { labelKey: "detection_accuracy", value: "94%" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { t } = useTranslation();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-28 pb-20 px-6 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {t("dashboard.good_morning")} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{today}</p>
          </div>
          <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 self-start md:self-auto">
            📊 {t("dashboard.demo_view")}
          </span>
        </motion.div>

        {/* ── Weather + Alerts row ── */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Weather snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">{t("dashboard.weather")}</h2>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                Sample
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              {t("dashboard.weather_note")}
            </p>
            <div className="space-y-4">
              {[
                { icon: Thermometer, label: "Temperature", value: "28°C", color: "text-orange-500" },
                { icon: Droplets, label: "Humidity", value: "72%", color: "text-blue-500" },
                { icon: CloudRain, label: "Rainfall", value: "4mm expected", color: "text-indigo-500" },
                { icon: Wind, label: "Wind Speed", value: "14 km/h", color: "text-gray-400 dark:text-gray-300" },
              ].map((w, i) => {
                const Icon = w.icon;
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
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
            className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-brand-green" />
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">{t("dashboard.alerts")}</h2>
              </div>
              <span className="text-xs text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full font-medium">
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
                  {t(alert.messageKey)}
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">{t(alert.timeKey)}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🌾 {t("dashboard.modules")}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <Link to={mod.link} key={i}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 hover:shadow-md hover:border-green-200 dark:hover:border-emerald-400 transition-all group h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="bg-green-50 dark:bg-gray-800 rounded-xl p-2">
                        <Icon size={20} className="text-brand-green" />
                      </div>
                      {mod.status === "live" ? (
                        <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-200 px-2 py-0.5 rounded-full">
                          ✅ {t("common.live")}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-200 px-2 py-0.5 rounded-full">
                          🔧 {t("common.coming_soon")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">
                      {t(`modules.${mod.titleKey}`)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {t(`modules.${mod.descKey}`)}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-brand-green text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("common.open")} <ArrowRight size={12} />
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
          className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-8"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <BarChart2 size={20} className="text-brand-green" />
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">{t("dashboard.price_trends")}</h2>
            </div>
            <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-500">
              📊 {t("dashboard.simulated_data")}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            {t("dashboard.price_note")}
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  formatter={(val) => `₹${val}/q`}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    color: "#F9FAFB",
                  }}
                />
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
          <div className="flex gap-6 mt-4 justify-center text-xs text-gray-500 dark:text-gray-400">
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
            🎯 {t("dashboard.goals")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-emerald-100 uppercase tracking-widest text-xs">
                  {t(`stats.${stat.labelKey}`)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}