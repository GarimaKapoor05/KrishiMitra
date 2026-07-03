import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../config";
import { useTranslation } from "react-i18next";
import {
  Sprout,
  Thermometer,
  Droplets,
  CloudRain,
  FlaskConical,
  Leaf,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function CropPrediction() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
        }),
      });

      const data = await response.json();

      console.log(data);

      setResult(data);
    } catch (err) {
      console.error(err);
      alert(t("cropPrediction.errBackend"));
    }

    setLoading(false);
  };

  const fields = [
    {
      label: t("cropPrediction.fieldN"),
      name: "N",
      icon: Leaf,
      placeholder: t("cropPrediction.placeholderN"),
    },
    {
      label: t("cropPrediction.fieldP"),
      name: "P",
      icon: FlaskConical,
      placeholder: t("cropPrediction.placeholderP"),
    },
    {
      label: t("cropPrediction.fieldK"),
      name: "K",
      icon: Sprout,
      placeholder: t("cropPrediction.placeholderK"),
    },
    {
      label: t("cropPrediction.fieldTemp"),
      name: "temperature",
      icon: Thermometer,
      placeholder: t("cropPrediction.placeholderTemp"),
    },
    {
      label: t("cropPrediction.fieldHumid"),
      name: "humidity",
      icon: Droplets,
      placeholder: t("cropPrediction.placeholderHumid"),
    },
    {
      label: t("cropPrediction.fieldPh"),
      name: "ph",
      icon: FlaskConical,
      placeholder: t("cropPrediction.placeholderPh"),
    },
    {
      label: t("cropPrediction.fieldRain"),
      name: "rainfall",
      icon: CloudRain,
      placeholder: t("cropPrediction.placeholderRain"),
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-32 pb-20 px-6 transition-colors duration-200">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-brand-green dark:text-emerald-400 mb-4">
            {t("cropPrediction.title")}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("cropPrediction.desc")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handlePredict}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 border border-gray-100 dark:border-gray-700"
        >
          <div className="grid md:grid-cols-2 gap-6">

            {fields.map((field) => {
              const Icon = field.icon;

              return (
                <div key={field.name}>

                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {field.label}
                  </label>

                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">

                    <Icon className="text-green-600 dark:text-green-400 mr-3" size={20} />

                    <input
                      type="number"
                      step="any"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full outline-none bg-transparent text-gray-900 dark:text-gray-100"
                    />

                  </div>

                </div>
              );
            })}

          </div>

          <div className="text-center mt-10">

            <button
              type="submit"
              disabled={loading}
              className="bg-brand-green dark:bg-emerald-600 hover:bg-green-700 dark:hover:bg-emerald-500 text-white px-10 py-4 rounded-full text-lg font-semibold transition"
            >

              {loading ? (
                <span className="flex items-center justify-center gap-2">

                  <Loader2 className="animate-spin" size={20} />

                  {t("cropPrediction.analyzing")}

                </span>
              ) : (
                t("cropPrediction.btnPredict")
              )}

            </button>

          </div>

        </motion.form>

        {/* =============================
              RESULT SECTION
              PART 2 STARTS HERE
        ============================== */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-8"
          >

            {/* Recommended Crop */}

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">

              <h2 className="text-2xl font-bold text-brand-green mb-6">
                {t("cropPrediction.recommendation")}
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">

                <div>

                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    {t("cropPrediction.recCrop")}
                  </p>

                  <h1 className="text-5xl font-extrabold text-green-700 dark:text-green-400">
                    🌾 {t(`crops.${result.recommended_crop}`, { defaultValue: result.recommended_crop })}
                  </h1>

                </div>

                <div className="md:w-80">

                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {t("cropPrediction.confidence")}
                    </span>

                    <span className="font-bold text-green-700">
                      {result.confidence}%
                    </span>

                  </div>

                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${result.confidence}%`,
                      }}
                      transition={{
                        duration: 1,
                      }}
                      className={`h-full rounded-full ${
                        result.confidence >= 80
                            ? "bg-green-600"
                            : result.confidence >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* Top Predictions */}

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">

              <h2 className="text-2xl font-bold mb-6">
                {t("cropPrediction.topPredictions")}
              </h2>

              <div className="space-y-4">

                {result.top_predictions.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center bg-green-50 dark:bg-gray-700 rounded-xl p-4"
                  >

                    <span className="font-semibold text-lg">

                      {index === 0 && "🥇 "}
                      {index === 1 && "🥈 "}
                      {index === 2 && "🥉 "}

                      {t(`crops.${item.crop}`, { defaultValue: item.crop })}

                    </span>

                    <span className="font-bold text-green-700">

                      {item.confidence}%

                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* Fertilizer Advice */}

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">

              <h2 className="text-2xl font-bold mb-6">

                {t("cropPrediction.fertilizerAdvisor")}

              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <div>

                  <h3 className="font-bold text-lg mb-3">

                    {t("cropPrediction.idealNpk")}

                  </h3>

                  <div className="space-y-2 text-gray-700 dark:text-gray-300">

                    <p>

                      {t("cropPrediction.nitrogen")} :
                      {" "}
                      {result.fertilizer_advice.ideal_npk.N}

                    </p>

                    <p>

                      {t("cropPrediction.phosphorus")} :
                      {" "}
                      {result.fertilizer_advice.ideal_npk.P}

                    </p>

                    <p>

                      {t("cropPrediction.potassium")} :
                      {" "}
                      {result.fertilizer_advice.ideal_npk.K}

                    </p>

                  </div>

                </div>

                <div>

                  <h3 className="font-bold text-lg mb-3">

                    {t("cropPrediction.yourSoil")}

                  </h3>

                  <div className="space-y-2 text-gray-700 dark:text-gray-300">

                    <p>

                      {t("cropPrediction.nitrogen")} :
                      {" "}
                      {result.fertilizer_advice.user_npk.N}

                    </p>

                    <p>

                      {t("cropPrediction.phosphorus")} :
                      {" "}
                      {result.fertilizer_advice.user_npk.P}

                    </p>

                    <p>

                      {t("cropPrediction.potassium")} :
                      {" "}
                      {result.fertilizer_advice.user_npk.K}

                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-8">

                <h3 className="font-bold text-lg mb-4">

                  {t("cropPrediction.suggestions")}

                </h3>

                <div className="space-y-3">

                  {result.fertilizer_advice.suggestions.map(
                    (suggestion, index) => (

                      <div
                        key={index}
                        className="bg-green-50 dark:bg-gray-700 border-l-4 border-green-600 p-4 rounded-lg"
                      >

                        ✅ {suggestion}

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* Link to dedicated fertilizer prediction page */}
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/fertilizer-prediction", {
                      state: { crop: result.recommended_crop },
                    })
                  }
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition"
                >
                  {t("cropPrediction.getDosage")}
                  <ArrowRight size={18} />
                </button>
              </div>

            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}