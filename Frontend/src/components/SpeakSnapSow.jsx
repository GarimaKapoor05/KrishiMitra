import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function SpeakSnapSow() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-12 text-white shadow-2xl transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xl">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">{t("speakSnapSow.badge")}</span>
            <h2 className="text-4xl font-bold mt-2 mb-6">{t("speakSnapSow.title")}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t("speakSnapSow.desc")}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 font-mono text-sm text-emerald-300 w-full md:w-80 backdrop-blur-sm">
            <p>{t("speakSnapSow.term1")}</p>
            <p>{t("speakSnapSow.term2")}</p>
            <p>{t("speakSnapSow.term3")}<span className="text-white">{t("speakSnapSow.term3Val")}</span></p>
            <p>{t("speakSnapSow.term4")}<span className="text-white">{t("speakSnapSow.term4Val")}</span></p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}