import { motion } from 'framer-motion';

const techFeatures = [
  { title: "Multilingual AI", desc: "OpenAI GPT-5.5 + Whisper integration" },
  { title: "Predictive Analytics", desc: "XGBoost, Prophet & LSTM Models" },
  { title: "Smart Irrigation", desc: "Real-time Soil & Weather API fusion" },
  { title: "Disease Detection", desc: "YOLOv8 + TensorFlow Processing" }
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-brand-green font-bold text-center mb-16 tracking-widest uppercase">The Tech Engine</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {techFeatures.map((f, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i} 
              className="p-8 bg-emerald-50 rounded-2xl border-b-4 border-brand-green"
            >
              <h4 className="font-bold text-xl mb-2">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}