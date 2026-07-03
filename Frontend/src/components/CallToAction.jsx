import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, MessageCircle, Phone, Leaf } from "lucide-react";
import { API_URL } from "../config";
import { useTranslation } from "react-i18next";

export default function CallToAction() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContact = async (e) => {
    e.preventDefault();
    if (!formData.phone) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || "Website Visitor",
          phone: formData.phone,
          email: formData.email,
          message: "Call back request from homepage"
        }),
      });

      const data = await res.json();

      if (data.success || res.ok) {
        setSubmitted(true);
        setMessage("cta.success");
        setFormData({ name: "", phone: "", email: "" });
      } else {
        setMessage("cta.errWrong");
      }
    } catch (err) {
      setMessage("cta.errServer");
    }
    setLoading(false);
  };

  return (
    <section className="py-24 px-6 text-center bg-bg-light dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-16 rounded-[3rem] border border-gray-100 dark:border-gray-700 shadow-2xl transition-colors">

        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {t("cta.title")}
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          {t("cta.desc")}
        </p>

        {/* Primary CTA */}
        <Link to="/register">
          <button className="bg-brand-green text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-green-700 transition-all flex items-center gap-2 mx-auto mb-10">
            <Leaf size={22} />
            {t("cta.btnStart")}
          </button>
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
          <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
            {t("cta.divider")}
          </span>
          <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          {t("cta.note")}
        </p>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-8 py-5 rounded-2xl text-sm font-medium max-w-md mx-auto">
            {t(message)}
          </div>
        ) : (
          <form onSubmit={handleContact} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("cta.placeholderName")}
              className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:border-green-500"
            />
            
            <div className="flex-1 flex items-center border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-green-400">
              <Phone size={18} className="text-gray-400 mr-3" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("cta.placeholderPhone")}
                required
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl text-sm font-semibold transition flex items-center gap-2 justify-center disabled:opacity-70 whitespace-nowrap"
            >
              <Send size={16} />
              {t("cta.btnCallback")}
            </button>
          </form>
        )}

        {/* WhatsApp */}
        <div className="mt-6">
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20KrishiMitra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-green-600 transition"
          >
            <MessageCircle size={18} />
            {t("cta.whatsapp")}
          </a>
        </div>

      </div>
    </section>
  );
}