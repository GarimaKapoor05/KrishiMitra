export default function FeatureShowcase() {
  const features = [
    { title: "Smart Crop Advisor", desc: "Matches your farm's unique soil profile with real-time global weather data to recommend the most profitable crop." },
    { title: "Market Price Forecaster", desc: "Utilizes historical price trends and seasonal data to tell you the perfect time to sell your harvest for maximum profit." },
    { title: "Logistics Optimizer", desc: "Connects your farm to the closest distribution centers, calculating the lowest transport cost and shortest delivery routes." }
  ];

  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black mb-16">Intelligence-Driven Farming</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}