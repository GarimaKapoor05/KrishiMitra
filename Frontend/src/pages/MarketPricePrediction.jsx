import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Leaf,
  CalendarDays,
  IndianRupee,
  Loader2,
  AlertCircle,
  ShieldCheck,
  BarChart3,
  Activity,
  LineChart,
  MapPin,
  Radio,
} from "lucide-react";

export default function MarketPricePrediction() {
  const [crop, setCrop] = useState("rice");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleForecast = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const payload = {
        crop,
        recent_prices: [2100, 2110, 2130, 2125, 2140, 2160, 2155, 2170, 2180, 2190],
      };
      const response = await fetch(`${API_URL}/api/market/forecast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        status: "error",
        message: "Unable to connect to the backend. Please ensure the Flask server is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isError = result && (result.status === "error" || result.error);
  const errorMessage = result?.message || result?.error || "";
  const trendUp = result?.trend === "Upward";
  const trendColor = trendUp ? "text-green-700" : "text-red-700";
  const trendBg = trendUp ? "bg-green-100" : "bg-red-100";

  return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-900 pt-32 pb-20 px-6 transition-colors duration-200">

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto text-center mb-12">

        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-5 py-2 rounded-full text-sm font-semibold mb-5">
          <TrendingUp className="w-4 h-4" />
          AI Powered LSTM Forecasting
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Market Price Prediction
        </h1>

        <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Predict tomorrow's crop prices using our LSTM-based forecasting model
          trained on historical mandi data. Get price trends, confidence score,
          and actionable selling recommendations.
        </p>

        {/* Roadmap intent line */}
        <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
          🚀 Currently live for Bhopal Mandi — expanding to every district,
          state, and village market across India.
        </p>

      </div>

      {/* ── Input card ── */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-10 transition-colors">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <BarChart3 className="text-emerald-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Forecast Parameters</h2>
            <p className="text-gray-500 dark:text-gray-400">Configure the crop details for AI price prediction.</p>
          </div>
        </div>

        <form onSubmit={handleForecast}>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Crop */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-200 mb-3">
                <Leaf className="w-4 h-4 text-green-600" />
                Crop
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="rice" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" >
                  Rice (Paddy)
                </option>
                <option value="wheat" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  Wheat
                </option>
                <option value="maize" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  Maize
                </option>
                <option value="cotton" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  Cotton
                </option>
                <option value="soybean" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  Soybean
                </option>
              </select>
            </div>

            {/* Forecast horizon */}
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-200 mb-3">
                <CalendarDays className="w-4 h-4 text-green-600" />
                Forecast Horizon
              </label>
              <input
                value="Next 24 Hours"
                disabled
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
              />
            </div>

          </div>

          {/* Pilot market info box — reframed */}
          <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-5">
            <div className="flex items-start gap-3">
              <Radio className="text-emerald-600 mt-0.5 shrink-0" size={18} />
              <div>
                <p className="text-green-800 dark:text-green-300 font-semibold">
                  📍 Pilot Market: Bhopal Mandi, Madhya Pradesh
                </p>
                <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                  Our LSTM model is currently trained on Bhopal mandi historical
                  data. This is our pilot deployment — the same model architecture
                  will scale to fetch live Agmarknet data for every mandi across
                  India as we expand.
                </p>
              </div>
            </div>
          </div>

          {/* Predict button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 flex justify-center items-center gap-3 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Generating Forecast...
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                Generate AI Forecast
              </>
            )}
          </button>

        </form>
      </div>

      {/* ── Error card ── */}
      {isError && (
        <div className="max-w-4xl mx-auto mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertCircle className="text-red-600" />
          </div>
          <div>
            <h3 className="font-bold text-red-700 dark:text-red-300 text-lg">Prediction Failed</h3>
            <p className="text-red-600 dark:text-red-400 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* ── Result section ── */}
      {result && result.status === "success" && (
        <div className="max-w-6xl mx-auto mt-12">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Activity className="text-green-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Market Forecast
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                AI generated insights for your selected crop.
              </p>
            </div>
          </div>

          {/* Top cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-5">
                <IndianRupee className="text-green-700" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Forecast Price</p>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white mt-2">₹{result.forecasted_price}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">per Quintal</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${trendBg}`}>
                {trendUp ? <TrendingUp className="text-green-700" /> : <TrendingDown className="text-red-700" />}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Market Trend</p>
              <h2 className={`text-3xl font-bold mt-2 ${trendColor}`}>{result.trend}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Expected direction</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
                <ShieldCheck className="text-blue-700" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">Confidence</p>
              <h2 className="text-3xl font-bold text-blue-700 mt-2">{result.confidence}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Model certainty</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-5">
                <Leaf className="text-amber-700" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recommendation</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{result.recommendation}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Suggested action</p>
            </div>

          </div>

          {/* Market insights */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${trendBg}`}>
                  {trendUp ? <TrendingUp className="text-green-700" /> : <TrendingDown className="text-red-700" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Price Movement</h3>
                  <p className="text-gray-500 dark:text-gray-400">Compared to the latest market price</p>
                </div>
              </div>
              <h2 className={`text-5xl font-black ${trendColor}`}>
                {result.percentage_change > 0 ? "+" : ""}{result.percentage_change}%
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                {trendUp
                  ? "The AI predicts an increase in tomorrow's mandi price. Farmers may consider waiting before selling."
                  : "The AI predicts a drop in price. Selling earlier could help maximize returns."}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <LineChart className="text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Market Outlook</h3>
                  <p className="text-gray-500 dark:text-gray-400">AI generated summary</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-8">{result.outlook}</p>
            </div>

          </div>

          {/* AI Summary */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white mt-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">AI Summary</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
                <p className="text-sm opacity-80">Forecast</p>
                <h2 className="text-3xl font-bold mt-2">₹{result.forecasted_price}</h2>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
                <p className="text-sm opacity-80">Trend</p>
                <h2 className="text-3xl font-bold mt-2">{result.trend}</h2>
              </div>
              <div className="bg-white/10 rounded-2xl p-5 backdrop-blur">
                <p className="text-sm opacity-80">Recommended Action</p>
                <h2 className="text-2xl font-bold mt-2">{result.recommendation}</h2>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── Coverage Roadmap ── */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-10">

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <MapPin className="text-emerald-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Coverage Roadmap</h2>
              <p className="text-gray-500 dark:text-gray-400">
                From one mandi to every village market in India.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                phase: "Phase 1 — Now",
                title: "Pilot: Bhopal Mandi",
                desc: "LSTM model trained on Bhopal mandi historical data. 5 crops, 24-hour price forecasting.",
                status: "live",
                badge: "✅ Live",
                badgeStyle: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
              },
              {
                phase: "Phase 2 — Next",
                title: "Madhya Pradesh Mandis",
                desc: "Expand to all major MP mandis via Agmarknet live API integration. 20+ crops, multi-day forecasting.",
                status: "planned",
                badge: "🔧 In Development",
                badgeStyle: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
              },
              {
                phase: "Phase 3 — Vision",
                title: "Pan-India Coverage",
                desc: "Every district, every village market across India. Regional language price alerts via SMS and voice.",
                status: "vision",
                badge: "🚀 Roadmap",
                badgeStyle: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-md transition-all"
              >
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.badgeStyle}`}>
                  {item.badge}
                </span>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mt-3 mb-1 uppercase tracking-widest">
                  {item.phase}
                </p>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
}