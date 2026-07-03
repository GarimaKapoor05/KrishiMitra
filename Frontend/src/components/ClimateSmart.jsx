import { useTranslation } from "react-i18next";

export default function ClimateSmart() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-bg-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div>
          <span className="text-brand-green font-bold uppercase tracking-widest text-sm">
            {t("climateSmart.badgeEnv")}
          </span>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white mt-2 mb-6">
            {t("climateSmart.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t("climateSmart.desc")}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
              {t("climateSmart.badgeTargets")}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {t("climateSmart.note")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t("climateSmart.stat1Title"), val: "38%", desc: t("climateSmart.stat1Desc") },
              { label: t("climateSmart.stat2Title"), val: "1.8t", desc: t("climateSmart.stat2Desc") },
              { label: t("climateSmart.stat3Title"), val: "94%", desc: t("climateSmart.stat3Desc") },
              { label: t("climateSmart.stat4Title"), val: "22%", desc: t("climateSmart.stat4Desc") }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
                <div className="text-3xl font-black text-brand-green mb-1">
                  {item.val}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}