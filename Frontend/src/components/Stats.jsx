export default function Stats() {
  return (
    <div className="bg-brand-green text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Farmers Onboarded", value: "120K+" },
          { label: "Water Saved", value: "38%" },
          { label: "CO2 Reduced", value: "2.4M t" },
          { label: "Detection Accuracy", value: "94%" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-4xl font-black mb-2">{stat.value}</div>
            <div className="text-emerald-100 uppercase tracking-widest text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}