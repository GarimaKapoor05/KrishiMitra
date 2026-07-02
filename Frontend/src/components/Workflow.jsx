import { motion } from 'framer-motion';

const steps = [
  {
    title: "Create Your Farm Profile",
    desc: "Register with your phone number. Add your land area, location, and soil type to get started."
  },
  {
    title: "Analyse Your Soil",
    desc: "Enter your soil's N-P-K values and pH. KrishiMitra calibrates every recommendation to your actual field conditions."
  },
  {
    title: "Get Your Crop Recommendation",
    desc: "Our AI suggests the best crop for your soil, climate, and season — with a confidence score and expected yield."
  },
  {
    title: "Plan Your Fertilizer",
    desc: "Know exactly which fertilizer to use, how much, and whether to go chemical or organic — calculated for your field size."
  },
  {
    title: "Schedule Irrigation",
    desc: "Get a watering schedule based on your crop's needs, local weather, and soil moisture levels."
  },
  {
    title: "Monitor Crop Health",
    desc: "Upload a photo of your crop or leaf. AI detects diseases, pests, and nutrient deficiencies early — before they spread."
  },
  {
    title: "Track Market Prices",
    desc: "See today's mandi prices and AI forecasts for the next 24 hours. Know the best time to sell before you leave the farm."
  },
  {
    title: "Sell & Track Your Harvest",
    desc: "Connect directly with buyers, FPOs, and mandis. Track your shipment and get paid — no middlemen."
  }
];

export default function Workflow() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto transition-colors duration-300">
      <h2 className="text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
        The Intelligent Farm Journey
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-xl mx-auto">
        From soil analysis to market sale — KrishiMitra guides every step of your farming season.
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