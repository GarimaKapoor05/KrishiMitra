import { useState, useRef } from 'react';
import axios from 'axios';

export default function DiseaseAI() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5001/predict', formData);
      setResult(res.data);
    } catch (error) {
      console.error("Error diagnosing:", error);
      alert("Failed to connect to the AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 mt-10">
      <h2 className="text-3xl font-black text-gray-900 mb-2">Crop Health Diagnostic</h2>
      <p className="text-gray-500 mb-8">Upload a clear photograph of the affected leaf to receive an AI-powered health analysis.</p>

      {/* Trigger input on click */}
      <div 
        className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:border-emerald-500 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        <div className="text-5xl mb-4">📸</div>
        <p className="font-bold text-gray-700">{loading ? "Analyzing..." : "Click to upload leaf image"}</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
      </div>

      {/* Result Card */}
      {result && (
        <div className="mt-8 p-6 bg-emerald-50 rounded-2xl flex justify-between items-center animate-fadeIn">
          <div>
            <p className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Diagnostic Result</p>
            <p className="text-2xl font-black text-emerald-900 capitalize">{result.disease}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-emerald-700">Status</p>
            <p className="text-xl font-black text-emerald-900">{result.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}