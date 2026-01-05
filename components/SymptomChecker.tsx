
import React, { useState } from 'react';
import { checkSymptoms } from '../services/geminiService';
import { SymptomCheckResult, Specialty } from '../types';

interface SymptomCheckerProps {
  onSpecialtySelect: (specialty: Specialty) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onSpecialtySelect }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomCheckResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const analysis = await checkSymptoms(description);
      setResult(analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const severityColors = {
    LOW: 'bg-green-100 text-green-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    HIGH: 'bg-orange-100 text-orange-700',
    EMERGENCY: 'bg-red-100 text-red-700'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-microchip text-white"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">AI Symptom Checker</h2>
              <p className="text-slate-500">Describe how you feel for instant health guidance</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., I have a persistent headache and feel slightly nauseous after meals for the past 3 days..."
              className="w-full h-32 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
              required
            />
            <button
              disabled={loading || !description.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bolt"></i>
                  Analyze Now
                </>
              )}
            </button>
          </form>
        </div>

        {result && (
          <div className="p-8 space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center gap-4">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${severityColors[result.severity]}`}>
                Severity: {result.severity}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recommended Specialists</h3>
                <div className="flex flex-wrap gap-2">
                  {result.possibleSpecialties.map((spec, i) => (
                    <button
                      key={i}
                      onClick={() => onSpecialtySelect(spec as Specialty)}
                      className="bg-white border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
                    >
                      {spec}
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recommendations</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 text-sm">
                      <i className="fa-solid fa-circle-check text-green-500 mt-0.5"></i>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl flex gap-4 border border-slate-100">
              <i className="fa-solid fa-triangle-exclamation text-slate-400 text-lg"></i>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                {result.disclaimer}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {!result && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <i className="fa-solid fa-shield-halved text-2xl text-blue-500 mb-3"></i>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Privacy First</h4>
            <p className="text-xs text-slate-500">Your health data is processed securely.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <i className="fa-solid fa-clock text-2xl text-purple-500 mb-3"></i>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Instant Analysis</h4>
            <p className="text-xs text-slate-500">Get insights in seconds from Gemini AI.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <i className="fa-solid fa-hand-holding-medical text-2xl text-emerald-500 mb-3"></i>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Guided Booking</h4>
            <p className="text-xs text-slate-500">Directly book the right specialist.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
