import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-white py-16 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 font-bold text-xl mb-4 text-brand-green">
            <Leaf /> KrishiMitra
          </div>
          <p className="text-gray-500">Sustainable farming, powered by AI — from seed to harvest.</p>
        </div>

        {[
          { title: "Product", links: ["Dashboard", "Disease Detection", "Crop Prediction", "AI Assistant"] },
          { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          { title: "Sustainability", links: ["Carbon reports", "Climate action", "Partner farms"] }
        ].map((section) => (
          <div key={section.title}>
            <h4 className="font-bold mb-4">{section.title}</h4>
            <ul className="space-y-2 text-gray-500">
              {section.links.map(link => (
                <li key={link} className="hover:text-brand-green cursor-pointer transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 text-center text-gray-400"
      >
        © 2026 KrishiMitra • Built for a greener tomorrow 🌿
      </motion.div>
    </footer>
  );
}