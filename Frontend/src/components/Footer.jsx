import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("footer.product"),
      links: [
        { label: t("nav.crop_prediction"), to: "/crop-prediction" },
        { label: t("exploreFeatures.f2Title"), to: "/features/price-prediction" },
        { label: t("exploreFeatures.f4Title"), to: "/features/irrigation" },
        { label: t("exploreFeatures.f3Title"), to: "/fertilizer-prediction" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), to: "/about" },
        { label: t("footer.careers"), to: "/careers" },
        { label: t("footer.press"), to: "/press" },
        { label: t("footer.contact"), to: "/contact" },
      ],
    },
    {
      title: t("footer.sustainability"),
      links: [
        { label: t("footer.carbonReports"), to: "/carbon-reports" },
        { label: t("footer.climateAction"), to: "/climate-action" },
        { label: t("footer.partnerFarms"), to: "/partner-farms" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 py-16 px-6 border-t border-gray-100 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl mb-4 text-brand-green dark:text-emerald-400"
          >
            <Leaf />
            KrishiMitra
          </Link>

          <p className="text-gray-500 dark:text-gray-400">
            {t("footer.desc")}
          </p>
        </div>

        {/* Footer Sections */}
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h4>

            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-500 dark:text-gray-400 hover:text-brand-green dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 dark:border-gray-700 text-center text-gray-400 dark:text-gray-500"
      >
        {t("footer.copyright")}
      </motion.div>
    </footer>
  );
}