export default function CallToAction() {
  return (
    <section className="py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto bg-white p-16 rounded-[3rem] border border-gray-100 shadow-2xl">
        <h2 className="text-5xl font-bold mb-6">Your farm. Smarter. Starting today.</h2>
        <p className="text-xl text-gray-600 mb-10">
          Join 120,000+ farmers using AI to grow more food with less water, fewer chemicals, and a smaller carbon footprint.
        </p>
        <button className="bg-brand-green text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-green-700 transition-all">
          Launch the dashboard →
        </button>
      </div>
    </section>
  );
}