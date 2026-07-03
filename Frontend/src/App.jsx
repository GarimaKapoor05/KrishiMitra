import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import FeatureShowcase from "./components/FeatureShowcase";
import Workflow from "./components/Workflow";
import ExploreFeatures from "./components/ExploreFeatures";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import SpeakSnapSow from "./components/SpeakSnapSow";
import ClimateSmart from "./components/ClimateSmart";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

import CropPrediction from "./pages/CropPrediction";
import FertilizerPrediction from "./pages/FertilizerPrediction";
import SmartIrrigationAdvisor from "./pages/SmartIrrigationAdvisor";
import ComingSoon from "./pages/ComingSoon";
import DiseaseDetection from "./pages/DiseaseDetection";
import Dashboard from "./pages/Dashboard";
import MarketPricePrediction from "./pages/MarketPricePrediction";

import Login from "./pages/Login";
import Register from "./pages/Register";

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeatureShowcase />
      <Workflow />
      <AnalyticsDashboard />
      <SpeakSnapSow />
      <ClimateSmart />
      <ExploreFeatures />
      <CallToAction />
    </>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="min-h-screen bg-[#FDFEFC] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/crop-prediction" element={<CropPrediction />} />
        <Route path="/fertilizer-prediction" element={<FertilizerPrediction />} />
        <Route path="/features/irrigation" element={<SmartIrrigationAdvisor />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="/features/price-prediction" element={<MarketPricePrediction />} />

        {/* Coming Soon */}
        <Route path="/disease-ai" element={<ComingSoon feature="🔬 AI Disease Detection" />} />
        <Route path="/features/voice-assistant" element={<ComingSoon feature="🎙️ AI Voice Assistant" />} />
        <Route path="/features/health-monitor" element={<ComingSoon feature="🌿 Crop Health Monitoring" />} />
        <Route path="/features/records" element={<ComingSoon feature="📑 Digital Farm Record" />} />
        <Route path="/features/calendar" element={<ComingSoon feature="📅 Crop Calendar & Task Planner" />} />
        <Route path="/features/schemes" element={<ComingSoon feature="🏛️ Government Scheme Advisor" />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;