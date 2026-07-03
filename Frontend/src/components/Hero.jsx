import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

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
          {t("hero.title")}{" "}
          <span className="text-brand-green dark:text-emerald-400">
            {t("hero.titleGreen")}
          </span>
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 mb-8">
          {t("hero.desc")}
        </p>

        <div className="flex gap-4">
          <Link to="/dashboard">
            <button className="bg-brand-green text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition">
              {t("hero.btnDashboard")}
            </button>
          </Link>

          <a href="/#capabilities">
            <button className="border border-gray-300 dark:border-gray-700 px-8 py-4 rounded-xl font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              {t("hero.btnExplore")}
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
            {t("hero.cardTitle")}
          </h3>

          <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
            {t("hero.cardBadge")}
          </span>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5 -mt-3">
          {t("hero.cardSubtitle")}
        </p>

        <div className="space-y-6">
          {[
            { label: t("hero.soilMoisture"), value: "64%", color: "text-blue-600 dark:text-blue-400" },
            { label: t("hero.optimalSowing"), value: t("hero.optimalSowingVal"), color: "text-brand-green dark:text-emerald-400" },
            { label: t("hero.priceTrend"), value: "+12.4%", color: "text-emerald-600 dark:text-emerald-400" }
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