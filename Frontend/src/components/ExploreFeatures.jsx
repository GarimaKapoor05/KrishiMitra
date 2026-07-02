import { motion } from 'framer-motion';

const features = [
  { title: "Crop Recommendation", desc: "AI-powered crop suggestions based on your soil, climate, and season.", link: "/crop-prediction" },
  { title: "Market Price Prediction", desc: "LSTM-powered forecasting for maximum harvest ROI.", link: "/features/price-prediction" },
  { title: "Fertilizer Recommendation", desc: "AI-optimized nutrient balancing for soil health.", link: "/fertilizer-prediction" },
  { title: "Smart Irrigation Advisor", desc: "Hyper-local weather & moisture-based control.", link: "/features/irrigation" },
  { title: "Crop Health Monitoring", desc: "Upload a leaf photo — AI detects diseases and pests instantly.", link: "/features/health-monitor" },
  { title: "Digital Farm Record", desc: "Secure, blockchain-ready farm documentation.", link: "/features/records" },
  { title: "AI Voice Assistant", desc: "Multilingual, hands-free farming support.", link: "/features/voice-assistant" },
  { title: "Crop Calendar & Task Planner", desc: "AI-generated sowing, irrigation, and harvest schedule for your entire season — with smart reminders.", link: "/features/calendar" },
  { title: "Government Scheme Advisor", desc: "Discover PM-KISAN, crop insurance, and state subsidies you're eligible for — matched to your farm profile.", link: "/features/schemes" },
];

export default function ExploreFeatures() {
  return (
    // Added id="capabilities" to allow navigation to this section
    <section id="capabilities" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-black text-center text-gray-900 dark:text-white mb-16">Platform Capabilities</h2>
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
            <span className="text-brand-green dark:text-emerald-400 font-bold text-sm">Explore →</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}