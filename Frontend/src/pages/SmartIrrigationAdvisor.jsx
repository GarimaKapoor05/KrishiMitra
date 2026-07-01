import { useState, useRef, useEffect } from "react";
import { Droplets, Thermometer, CloudRain, Leaf, Loader2, AlertTriangle, Award } from "lucide-react";

export default function SmartIrrigationAdvisor() {
  const [formData, setFormData] = useState({
    moisture: "", humidity: "", temp: "", et: ""
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        moisture: parseFloat(formData.moisture),
        humidity: parseFloat(formData.humidity),
        temp: parseFloat(formData.temp),
        et: parseFloat(formData.et || 4.5)
      };

      const response = await fetch('http://127.0.0.1:5000/irrigation/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Backend not running. Start with: python app.py");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-[#FDFEFC] pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-100 rounded-3xl">
              <Droplets className="w-14 h-14 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-emerald-900">Smart Irrigation Advisor</h1>
          <p className="text-xl text-emerald-700 mt-3">
            Hyper-local AI recommendations for precise water management
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl shadow p-10 mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-center text-emerald-900">Current Field Conditions</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
            {[
              { name: "moisture", label: "Soil Moisture (%)", placeholder: "e.g. 25", icon: Droplets },
              { name: "humidity", label: "Air Humidity (%)", placeholder: "e.g. 65", icon: CloudRain },
              { name: "temp", label: "Temperature (°C)", placeholder: "e.g. 32", icon: Thermometer },
              { name: "et", label: "Evapotranspiration (mm/day)", placeholder: "e.g. 5.2", icon: Leaf }
            ].map((field) => (
              <div key={field.name}>
                <label className="flex items-center gap-2 text-emerald-700 mb-2">
                  <field.icon className="w-5 h-5" /> {field.label}
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  step="0.1"
                  required
                  className="w-full px-5 py-4 border border-emerald-100 rounded-2xl focus:border-emerald-500 focus:outline-none text-lg"
                />
              </div>
            ))}
          </form>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Get AI Irrigation Recommendation"}
          </button>
        </div>

        {/* Results */}
        <div ref={resultRef}>
          {result && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-emerald-900">AI Recommendation</h2>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Award className="w-6 h-6" /> {result.urgency} Priority
                  </div>
                </div>

                <div className="text-center mb-10">
                  <div className="text-8xl mb-6">{result.recommendation.includes("Irrigate") ? "💧" : "🌱"}</div>
                  <h3 className="text-5xl font-bold text-emerald-900 mb-2">{result.recommendation}</h3>
                  <p className="text-2xl text-emerald-600">Water Needed: <span className="font-bold">{result.water_amount_mm} mm</span></p>
                </div>

                <div className="bg-emerald-50 p-8 rounded-2xl text-lg">
                  {result.advice}
                </div>
              </div>

              {result.insights && result.insights.length > 0 && (
                <div className="bg-amber-50 p-8 rounded-3xl">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" /> Important Insights
                  </h3>
                  <ul className="space-y-3 text-amber-800">
                    {result.insights.map((insight, i) => (
                      <li key={i}>• {insight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}