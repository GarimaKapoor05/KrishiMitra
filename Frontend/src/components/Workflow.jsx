import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Workflow() {
  const { t } = useTranslation();

  const steps = [
    {
      title: t("workflow.step1Title"),
      desc: t("workflow.step1Desc")
    },
    {
      title: t("workflow.step2Title"),
      desc: t("workflow.step2Desc")
    },
    {
      title: t("workflow.step3Title"),
      desc: t("workflow.step3Desc")
    },
    {
      title: t("workflow.step4Title"),
      desc: t("workflow.step4Desc")
    },
    {
      title: t("workflow.step5Title"),
      desc: t("workflow.step5Desc")
    },
    {
      title: t("workflow.step6Title"),
      desc: t("workflow.step6Desc")
    },
    {
      title: t("workflow.step7Title"),
      desc: t("workflow.step7Desc")
    },
    {
      title: t("workflow.step8Title"),
      desc: t("workflow.step8Desc")
    }
  ];

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto transition-colors duration-300">
      <h2 className="text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
        {t("workflow.title")}
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-xl mx-auto">
        {t("workflow.subtitle")}
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-green to-emerald-200" />

        {steps.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-20 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="absolute left-4 md:left-1/2 -ml-3 w-6 h-6 bg-white dark:bg-gray-800 border-2 border-brand-green dark:border-emerald-400 rounded-full flex items-center justify-center font-bold text-xs text-brand-green dark:text-emerald-400 shadow-lg z-10 transition-colors">
                {index + 1}
              </div>

              <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-20 md:text-right' : 'md:pl-20'} ml-10 md:ml-0`}>
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}