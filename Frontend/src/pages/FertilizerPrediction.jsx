import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../config";
import { useTranslation } from "react-i18next";
import {
  Sprout,
  FlaskConical,
  Leaf,
  Loader2,
  Ruler,
  Recycle,
} from "lucide-react";

const CROP_OPTIONS = [
  "rice", "maize", "chickpea", "kidneybeans", "pigeonpeas", "mothbeans",
  "mungbean", "blackgram", "lentil", "pomegranate", "banana", "mango",
  "grapes", "watermelon", "muskmelon", "apple", "orange", "papaya",
  "coconut", "cotton", "jute", "coffee",
];

export default function FertilizerPrediction() {
  const { t } = useTranslation();
  const location = useLocation();
  const prefill = location.state || {};

  const [formData, setFormData] = useState({
    crop: prefill.crop || "",
    N: prefill.N ?? "",
    P: prefill.P ?? "",
    K: prefill.K ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [landArea, setLandArea] = useState("");
  const [useOrganic, setUseOrganic] = useState(false);
  const [dosageLoading, setDosageLoading] = useState(false);
  const [dosage, setDosage] = useState(null);

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
    setDosage(null);

    try {
      const response = await fetch(`${API_URL}/predict-fertilizer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop: formData.crop,
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.error || t("fertilizerPrediction.errWrong"));
        setLoading(false);
        return;
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      alert(t("fertilizerPrediction.errBackend"));
    }

    setLoading(false);
  };

  const handleGetDosage = async () => {
    if (!landArea || Number(landArea) <= 0) {
      alert(t("fertilizerPrediction.alertArea"));
      return;
    }

    setDosageLoading(true);
    setDosage(null);

    try {
      const response = await fetch(`${API_URL}/fertilizer-dosage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crop: formData.crop,
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          land_area_ha: Number(landArea),
          use_organic: useOrganic,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.error || t("fertilizerPrediction.errWrong"));
        setDosageLoading(false);
        return;
      }

      setDosage(data);
    } catch (err) {
      console.error(err);
      alert(t("fertilizerPrediction.errBackend"));
    }

    setDosageLoading(false);
  };

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-900 pt-32 pb-20 px-6">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-brand-green mb-4">
            {t("fertilizerPrediction.title")}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t("fertilizerPrediction.desc")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handlePredict}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 border border-gray-100 dark:border-gray-700 transition-colors"
        >
          <div className="grid md:grid-cols-2 gap-6">

            {/* Crop Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                {t("fertilizerPrediction.crop")}
              </label>

              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-gray-100 focus-within:ring-2 focus-within:ring-green-500">
                <Sprout className="text-green-600 mr-3" size={20} />

                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-transparent text-gray-900 dark:text-gray-100"
                >
                  <option
                    value=""
                    disabled
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {t("fertilizerPrediction.selectCrop")}
                  </option>

                  {CROP_OPTIONS.map((crop) => (
                    <option
                      key={crop}
                      value={crop}
                      className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {t(`crops.${crop}`, { defaultValue: capitalize(crop) })}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* N */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                {t("fertilizerPrediction.fieldN")}
              </label>

              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                <Leaf className="text-green-600 mr-3" size={20} />

                <input
                  type="number"
                  step="any"
                  name="N"
                  value={formData.N}
                  onChange={handleChange}
                  placeholder={t("fertilizerPrediction.placeholderN")}
                  required
                  className="w-full outline-none bg-transparent text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* P */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                {t("fertilizerPrediction.fieldP")}
              </label>

              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                <FlaskConical className="text-green-600 mr-3" size={20} />

                <input
                  type="number"
                  step="any"
                  name="P"
                  value={formData.P}
                  onChange={handleChange}
                  placeholder={t("fertilizerPrediction.placeholderP")}
                  required
                  className="w-full outline-none bg-transparent text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* K */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-200 mb-2">
                {t("fertilizerPrediction.fieldK")}
              </label>

              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                <Sprout className="text-green-600 mr-3" size={20} />

                <input
                  type="number"
                  step="any"
                  name="K"
                  value={formData.K}
                  onChange={handleChange}
                  placeholder={t("fertilizerPrediction.placeholderK")}
                  required
                  className="w-full outline-none bg-transparent text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

          </div>

          <div className="text-center mt-10">

            <button
              type="submit"
              disabled={loading}
              className="bg-brand-green hover:bg-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition"
            >

              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  {t("fertilizerPrediction.analyzing")}
                </span>
              ) : (
                t("fertilizerPrediction.btnPredict")
              )}

            </button>

          </div>

        </motion.form>

        {/* =============================
              RESULT SECTION
        ============================== */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-8"
          >

            {/* Condition + confidence */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">

              <h2 className="text-2xl font-bold text-brand-green mb-6">
                {t("fertilizerPrediction.soilCondition")}
              </h2>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    {t("fertilizerPrediction.detectedCondition")}
                  </p>

                  <h1 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
                    {result.condition.replace(/_/g, " ")}
                  </h1>
                </div>

                <div className="md:w-80">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{t("fertilizerPrediction.confidence")}</span>
                    <span className="font-bold text-green-700">
                      {result.confidence}%
                    </span>
                  </div>

                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1 }}
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

            {/* NPK comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">

              <h2 className="text-2xl font-bold mb-6">
                {t("fertilizerPrediction.npkComparison")}
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <div>
                  <h3 className="font-bold text-lg mb-3">{t("fertilizerPrediction.idealNpk")}</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>{t("fertilizerPrediction.nitrogen")} : {result.ideal_npk.N}</p>
                    <p>{t("fertilizerPrediction.phosphorus")} : {result.ideal_npk.P}</p>
                    <p>{t("fertilizerPrediction.potassium")} : {result.ideal_npk.K}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">{t("fertilizerPrediction.yourSoil")}</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>{t("fertilizerPrediction.nitrogen")} : {result.input_npk.N}</p>
                    <p>{t("fertilizerPrediction.phosphorus")} : {result.input_npk.P}</p>
                    <p>{t("fertilizerPrediction.potassium")} : {result.input_npk.K}</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Fertilizer recommendation */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">

              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("fertilizerPrediction.recFertilizer")}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 dark:border-green-500 p-5 rounded-lg">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    {t("fertilizerPrediction.chemicalOpt")}
                  </p>
                  <p className="font-bold text-lg text-green-800 dark:text-green-300">
                    {result.chemical_fertilizer}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-600 dark:border-amber-500 p-5 rounded-lg">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                    <Recycle size={14} /> {t("fertilizerPrediction.organicAlt")}
                  </p>
                  <p className="font-bold text-lg text-amber-800 dark:text-amber-300">
                    {result.organic_alternative}
                  </p>
                </div>

              </div>

              {/* Dosage trigger */}
              <div className="mt-10 border-t pt-8">

                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Ruler size={20} className="text-green-600" />
                  {t("fertilizerPrediction.quantityQuestion")}
                </h3>

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                    <input
                      type="number"
                      step="any"
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      placeholder={t("fertilizerPrediction.placeholderArea")}
                      className="w-full outline-none bg-transparent text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={useOrganic}
                      onChange={(e) => setUseOrganic(e.target.checked)}
                      className="accent-green-600"
                    />
                    {t("fertilizerPrediction.checkOrganic")}
                  </label>

                  <button
                    type="button"
                    onClick={handleGetDosage}
                    disabled={dosageLoading}
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold transition"
                  >
                    {dosageLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} />
                        {t("fertilizerPrediction.calculating")}
                      </span>
                    ) : (
                      t("fertilizerPrediction.btnCalculate")
                    )}
                  </button>

                </div>

              </div>

              {/* Dosage result */}
              {dosage && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  {dosage.note ? (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 rounded-lg text-blue-900 dark:text-blue-300">
                      ℹ️ {dosage.note}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dosage.dosage_plan.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 rounded-xl p-4"
                        >
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {item.fertilizer}
                          </span>
                          <span className="font-bold text-green-700 dark:text-green-300">
                            {item.total_kg_needed} kg total
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}