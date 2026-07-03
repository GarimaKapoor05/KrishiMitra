import { useTranslation } from "react-i18next";

export default function FeatureShowcase() {
  const { t } = useTranslation();

  const features = [
    {
      title: t("featureShowcase.f1Title"),
      desc: t("featureShowcase.f1Desc"),
      status: "live"
    },
    {
      title: t("featureShowcase.f2Title"),
      desc: t("featureShowcase.f2Desc"),
      status: "live"
    },
    {
      title: t("featureShowcase.f3Title"),
      desc: t("featureShowcase.f3Desc"),
      status: "coming"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-16">{t("featureShowcase.title")}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-colors"
            >

              {f.status === "live" && (
                <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full mb-4 inline-block">
                  {t("featureShowcase.badgeLive")}
                </span>
              )}

              {f.status === "coming" && (
                <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full mb-4 inline-block">
                  {t("featureShowcase.badgeComing")}
                </span>
              )}

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.desc}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}