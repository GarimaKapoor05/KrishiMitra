import { useState, useRef, useEffect } from "react";
import { API_URL } from "../config";
import { useTranslation } from "react-i18next";
import {
  Droplets,
  Thermometer,
  CloudRain,
  Leaf,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function SmartIrrigationAdvisor() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    moisture: "",
    humidity: "",
    temp: "",
    et: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        moisture: parseFloat(formData.moisture),
        humidity: parseFloat(formData.humidity),
        temp: parseFloat(formData.temp),
        et: parseFloat(formData.et || 4.5),
      };

      const response = await fetch(
        `${API_URL}/irrigation/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate recommendation.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(t("irrigationAdvisor.errBackend"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  const priorityStyle = {
    High: {
      badge:
        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
      icon: "🔴",
    },
    Medium: {
      badge:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
      icon: "🟡",
    },
    Low: {
      badge:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
      icon: "🟢",
    },
  };
    return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-900 py-16 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-6">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-100 to-green-50 shadow-sm mb-6">
            <Droplets className="w-10 h-10 text-emerald-600" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-emerald-950 dark:text-white">
            {t("irrigationAdvisor.title")}
          </h1>

          <p className="mt-4 text-lg text-emerald-700 dark:text-emerald-300 max-w-2xl mx-auto leading-8">
            {t("irrigationAdvisor.desc")}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm p-8 md:p-10 transition-colors">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-emerald-900 dark:text-white">
              {t("irrigationAdvisor.fieldConditions")}
            </h2>

            <p className="mt-2 text-emerald-600 dark:text-emerald-300">
              {t("irrigationAdvisor.demoNote")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {[
              {
                name: "moisture",
                label: t("irrigationAdvisor.moisture"),
                placeholder: t("irrigationAdvisor.placeholderMoisture"),
                icon: Droplets,
              },
              {
                name: "humidity",
                label: t("irrigationAdvisor.humidity"),
                placeholder: t("irrigationAdvisor.placeholderHumidity"),
                icon: CloudRain,
              },
              {
                name: "temp",
                label: t("irrigationAdvisor.temp"),
                placeholder: t("irrigationAdvisor.placeholderTemp"),
                icon: Thermometer,
              },
              {
                name: "et",
                label: t("irrigationAdvisor.et"),
                placeholder: t("irrigationAdvisor.placeholderEt"),
                icon: Leaf,
              },
            ].map((field) => (
              <div key={field.name}>

                <label className="flex items-center gap-2 mb-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  <field.icon className="w-4 h-4 text-emerald-600" />
                  {field.label}
                </label>

                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  step="0.1"
                  required
                  className="w-full rounded-2xl border border-emerald-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-5 py-4 text-lg outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30"
                />

              </div>
            ))}

            <div className="md:col-span-2 mt-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 transition-all text-white py-4 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("irrigationAdvisor.generating")}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    {t("irrigationAdvisor.btnPredict")}
                  </>
                )}
              </button>

            </div>

          </form>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        <div ref={resultRef} className="mt-10">
          {result && (
  <div className="space-y-8">

    {/* Recommendation Card */}
    <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-emerald-100 dark:border-gray-700 px-8 py-6">

        <div>
          <h2 className="text-2xl font-bold text-emerald-950 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            {t("irrigationAdvisor.recTitle")}
          </h2>

          <p className="text-emerald-600 dark:text-emerald-300 mt-1">
            {t("irrigationAdvisor.recDesc")}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
            priorityStyle[result.urgency]?.badge
          }`}
        >
          <span>{priorityStyle[result.urgency]?.icon}</span>
          {result.urgency} {t("irrigationAdvisor.priority")}
        </span>

      </div>

      {/* Body */}
      <div className="p-8">

        {/* Main Recommendation */}

        <div className="text-center mb-10">

          <div className="text-6xl mb-4">
            {result.recommendation.startsWith("No")
              ? "🌱"
              : "💧"}
          </div>

          <h3 className="text-4xl font-bold text-emerald-950 dark:text-white">
            {result.recommendation}
          </h3>

          <p className="text-emerald-600 dark:text-emerald-300 mt-3">
            {t("irrigationAdvisor.recDesc")}
          </p>

        </div>

        {/* Summary Cards */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/20 p-6">

            <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
              {t("irrigationAdvisor.waterRequired")}
            </p>

            <h4 className="text-3xl font-bold text-emerald-950 dark:text-white">
              {result.water_amount_mm} mm
            </h4>

          </div>

          <div className="rounded-2xl border border-sky-100 dark:border-sky-900/30 bg-sky-50 dark:bg-sky-900/20 p-6">

            <p className="text-sm text-sky-700 dark:text-sky-300 mb-2">
              {t("irrigationAdvisor.recMethod")}
            </p>

            <h4 className="text-2xl font-semibold text-sky-900 dark:text-sky-300">
              {result.recommendation.startsWith("No")
                ? "Monitoring"
                : "Drip Irrigation"}
            </h4>

          </div>

          <div className="rounded-2xl border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/20 p-6">

            <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">
              {t("irrigationAdvisor.confidence")}
            </p>

            <h4 className="text-2xl font-semibold text-amber-900 dark:text-amber-300">
              {result.urgency === "High"
                ? "High"
                : result.urgency === "Medium"
                ? "Moderate"
                : "Good"}
            </h4>

          </div>

        </div>

        {/* Why */}

        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50 dark:bg-emerald-900/20 p-6">

          <h4 className="font-semibold text-emerald-950 dark:text-white mb-3">
            {t("irrigationAdvisor.why")}
          </h4>

          <p className="text-emerald-800 dark:text-emerald-300 leading-7">
            {result.advice}
          </p>

        </div>

      </div>

    </div>
          {/* Key Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-sm p-8">

        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <h3 className="text-xl font-semibold text-emerald-950 dark:text-white">
            {t("irrigationAdvisor.keyInsights")}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-5">
            <div className="flex items-center gap-2 text-emerald-700 mb-3">
              <Clock3 className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("irrigationAdvisor.nextIrrigation")}
              </span>
            </div>

            <p className="text-2xl font-bold text-emerald-950 dark:text-white">
              {result.recommendation.startsWith("No") ? "24+ hrs" : "1 day"}
            </p>
          </div>

          <div className="rounded-2xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-900/30 p-5">
            <div className="flex items-center gap-2 text-sky-700 mb-3">
              <Droplets className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("irrigationAdvisor.estSavings")}
              </span>
            </div>

            <p className="text-2xl font-bold text-sky-900 dark:text-sky-300">
              {Math.max(0, Math.round((parseFloat(formData.et || 4.5) * 2)))}%
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 p-5">
            <div className="flex items-center gap-2 text-amber-700 mb-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("irrigationAdvisor.systemStatus")}
              </span>
            </div>

            <p className="text-2xl font-bold text-amber-900 dark:text-amber-300">
              Operational
            </p>
          </div>

        </div>

        {result.insights?.length > 0 && (
          <div className="mt-8">

            <h4 className="text-lg font-semibold text-emerald-950 dark:text-white mb-4">
              {t("irrigationAdvisor.fieldObs")}
            </h4>

            <div className="space-y-3">

              {result.insights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-4"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />

                  <p className="text-emerald-900 dark:text-emerald-300">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>
        )}

      </div>

    </div>
  )}

</div>

</div>
</div>

);
}