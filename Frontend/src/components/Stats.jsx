export default function Stats() {
  const stats = [
    {
      tag: "Goal",
      value: "100K+",
      label: "Farmers Impacted",
    },
    {
      tag: "Vision",
      value: "95%",
      label: "Detection Goal",
    },
    {
      tag: "Target",
      value: "30%",
      label: "Water Savings",
    },
    {
      tag: "Mission",
      value: "∞",
      label: "Innovation Ahead",
    },
  ];

  return (
    <section className="bg-brand-green text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              {/* Badge */}
              <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/10 text-emerald-100 text-xs font-medium tracking-wider uppercase">
                {stat.tag}
              </span>

              {/* Fixed-height value container */}
              <div className="h-20 flex items-center justify-center">
                <h3
                  className={`font-black leading-none ${
                    stat.value === "∞"
                      ? "text-5xl md:text-6xl text-emerald-50"
                      : "text-4xl md:text-5xl"
                  }`}
                >
                  {stat.value}
                </h3>
              </div>

              {/* Label */}
              <p className="mt-3 text-sm md:text-base text-emerald-100 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-emerald-100/70">
          Visionary goals for AgriAI's long-term roadmap — not current deployment metrics.
        </p>
      </div>
    </section>
  );
}