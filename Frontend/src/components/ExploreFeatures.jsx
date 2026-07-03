import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ExploreFeatures() {
  const { t } = useTranslation();

  const features = [
    { title: t("exploreFeatures.f1Title"), desc: t("exploreFeatures.f1Desc"), link: "/crop-prediction" },
    { title: t("exploreFeatures.f2Title"), desc: t("exploreFeatures.f2Desc"), link: "/features/price-prediction" },
    { title: t("exploreFeatures.f3Title"), desc: t("exploreFeatures.f3Desc"), link: "/fertilizer-prediction" },
    { title: t("exploreFeatures.f4Title"), desc: t("exploreFeatures.f4Desc"), link: "/features/irrigation" },
    { title: t("exploreFeatures.f5Title"), desc: t("exploreFeatures.f5Desc"), link: "/features/health-monitor" },
    { title: t("exploreFeatures.f6Title"), desc: t("exploreFeatures.f6Desc"), link: "/features/records" },
    { title: t("exploreFeatures.f7Title"), desc: t("exploreFeatures.f7Desc"), link: "/features/voice-assistant" },
    { title: t("exploreFeatures.f8Title"), desc: t("exploreFeatures.f8Desc"), link: "/features/calendar" },
    { title: t("exploreFeatures.f9Title"), desc: t("exploreFeatures.f9Desc"), link: "/features/schemes" },
  ];

  return (
    // Added id="capabilities" to allow navigation to this section
    <section id="capabilities" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-16">{t("exploreFeatures.title")}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.a
            key={i}
            href={f.link}
            whileHover={{ y: -10 }}
            className="group p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-brand-green dark:text-emerald-400 font-bold text-xl">
              {i + 1}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-green transition">{f.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{f.desc}</p>
            <span className="text-brand-green dark:text-emerald-400 font-bold text-sm">{t("exploreFeatures.explore")} →</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}