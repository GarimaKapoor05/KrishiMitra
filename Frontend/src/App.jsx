import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FeatureShowcase from './components/FeatureShowcase';
import Workflow from './components/Workflow'; // New import
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SpeakSnapSow from './components/SpeakSnapSow';
import ClimateSmart from './components/ClimateSmart';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FDFEFC] text-gray-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeatureShowcase />
        <Workflow /> {/* Inserted here */}
        <AnalyticsDashboard />
        <SpeakSnapSow />
        <ClimateSmart />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;