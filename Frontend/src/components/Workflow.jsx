import { motion } from 'framer-motion';

const steps = [
  { title: "Unified Authentication", desc: "Access your portal via Firebase or Clerk." },
  { title: "Environment Profiling", desc: "Input soil composition for AI calibration." },
  { title: "Multilingual Voice Input", desc: "Speak directly to KrishiMitra for support." },
  { title: "Computer Vision Diagnosis", desc: "Detect diseases via YOLOv8 snapshots." },
  { title: "Predictive Analytics", desc: "Forecast yields and nitrogen needs." },
  { title: "Dynamic Crop Advisor", desc: "AI-driven suggestions based on weather." },
  { title: "Market Trend Forecast", desc: "Visualize price data to find selling windows." },
  { title: "Logistics & Marketplace", desc: "Finalize sales and track shipments." }
];

export default function Workflow() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-black text-center mb-16">The Intelligent Farm Journey</h2>
      <div className="relative">
        {/* The Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-green to-emerald-200" />
        
        {steps.map((step, index) => {
          const isLeft = index % 2 === 0; // 0, 2, 4, 6 are 1, 3, 5, 7 (Left)
          return (
            <motion.div 
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }} // Slower duration
              viewport={{ once: true }}
              key={index}
              className={`relative flex items-center mb-20 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="absolute left-4 md:left-1/2 -ml-3 w-6 h-6 bg-white border-2 border-brand-green rounded-full flex items-center justify-center font-bold text-xs text-brand-green shadow-lg z-10">
                {index + 1}
              </div>
              
              <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-20 md:text-right' : 'md:pl-20'} ml-10 md:ml-0`}>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}