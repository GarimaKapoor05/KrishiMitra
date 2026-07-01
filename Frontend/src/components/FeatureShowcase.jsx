export default function FeatureShowcase() {
  const features = [
    {
      title: "Smart Crop Advisor",
      desc: "Matches your farm's unique soil profile with real-time global weather data to recommend the most profitable crop.",
      status: "live"
    },
    {
      title: "Market Price Forecaster",
      desc: "Utilizes historical price trends and seasonal data to tell you the perfect time to sell your harvest for maximum profit.",
      status: "coming"
    },
    {
      title: "Logistics Optimizer",
      desc: "Connects your farm to the closest distribution centers, calculating the lowest transport cost and shortest delivery routes.",
      status: "coming"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-black mb-16">Intelligence-Driven Farming</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
            >

              {f.status === "live" && (
                <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-4 inline-block">
                  ✅ Live
                </span>
              )}

              {f.status === "coming" && (
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mb-4 inline-block">
                  🔧 In Development
                </span>
              )}

              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
