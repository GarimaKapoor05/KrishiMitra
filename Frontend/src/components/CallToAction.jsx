import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, MessageCircle, Phone } from "lucide-react";

export default function CallToAction() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleContact = (e) => {
    e.preventDefault();
    if (!phone) return;
    // In production: send to backend / CRM
    setSubmitted(true);
    setPhone("");
  };

  return (
    <section className="py-24 px-6 text-center bg-bg-light dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-16 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-2xl transition-colors">

        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Your farm. Smarter. Starting today.
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          Built for Indian farmers — AI-powered crop advice, fertilizer
          recommendations, and irrigation scheduling, all in one platform.
        </p>

        {/* Primary CTA */}
        <Link to="/signup">
          <button className="bg-brand-green text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-green-700 transition-all">
            Start Your Smart Farm →
          </button>
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
          <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
            or get in touch
          </span>
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
        </div>

        {/* Contact section */}
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Interested in deploying KrishiMitra for your FPO, agri-cooperative,
          or state agriculture department?{" "}
          <span className="text-brand-green font-semibold">
            Leave your number — we'll call you.
          </span>
        </p>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-6 py-4 rounded-2xl text-sm font-medium">
            ✅ Got it! Our team will call you within 24 hours.
          </div>
        ) : (
          <form
            onSubmit={handleContact}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-green-400">
              <Phone size={15} className="text-gray-400 dark:text-gray-500 mr-2 shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 your mobile number"
                required
                pattern="[0-9+\s\-]{10,15}"
                className="w-full text-sm outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition flex items-center gap-2 justify-center"
            >
              <Send size={15} />
              Call me back
            </button>
          </form>
        )}

        {/* WhatsApp option */}
        <div className="mt-4">
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20KrishiMitra%20for%20my%20farm%2FFPO."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition"
          >
            <MessageCircle size={15} />
            Or message us on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}