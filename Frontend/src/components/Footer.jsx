import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Product",
    links: [
      { label: "Crop Prediction", to: "/crop-prediction" },
      { label: "Market Price Prediction", to: "/features/price-prediction" },
      { label: "Smart Irrigation", to: "/features/irrigation" },
      { label: "Fertilizer Recommendation", to: "/fertilizer-prediction" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Sustainability",
    links: [
      { label: "Carbon Reports", to: "/carbon-reports" },
      { label: "Climate Action", to: "/climate-action" },
      { label: "Partner Farms", to: "/partner-farms" },
    ],
  },
];

export default function Footer() {
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
            Sustainable farming, powered by AI — from seed to harvest.
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
        © 2026 KrishiMitra • Built for a greener tomorrow 🌿
      </motion.div>
    </footer>
  );
}