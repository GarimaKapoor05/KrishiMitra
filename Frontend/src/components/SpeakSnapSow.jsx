import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SpeakSnapSow() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a] rounded-[2rem] p-12 text-white shadow-2xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xl">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Interaction Engine</span>
            <h2 className="text-4xl font-bold mt-2 mb-6">Multilingual AI-Powered Guidance</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Leveraging advanced LLM chains, Whisper for speech-to-text, and ElevenLabs for natural synthesis, KrishiMitra provides real-time, language-agnostic agronomic support.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 font-mono text-sm text-emerald-300 w-full md:w-80">
            <p> initializing_voice_engine...</p>
            <p> connecting_to_llm_chain...</p>
            <p> status: <span className="text-white">ONLINE</span></p>
            <p> latency: <span className="text-white">120ms</span></p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}