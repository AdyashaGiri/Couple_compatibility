
import React, { useEffect, useState } from 'react';
import { QuizState, Question } from '../types';
import { analyzeCompatibility } from '../services/gemini';
import { RotateCcw, Sparkles, Heart, CheckCircle2, ThumbsUp, Quote } from 'lucide-react';

interface ResultProps {
  state: QuizState;
  questions: Question[];
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ state, questions, onReset }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Consulting the stars...');

  const matches = state.partner1Answers.reduce((acc, ans, idx) => {
    if (ans === state.partner2Answers[idx]) acc.push(idx);
    return acc;
  }, [] as number[]);

  const score = Math.round((matches.length / questions.length) * 100);

  useEffect(() => {
    const messages = [
      "Consulting the relationship gurus...",
      "Analyzing your shared chemistry...",
      "Measuring romantic potential...",
      "Decoding your compatibility patterns...",
      "Almost there, finalizing your love report..."
    ];
    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % messages.length;
      setLoadingMessage(messages[msgIdx]);
    }, 2500);

    const getAnalysis = async () => {
      const result = await analyzeCompatibility(state, questions);
      setAnalysis(result);
      setLoadingAnalysis(false);
      clearInterval(interval);
    };
    getAnalysis();
    return () => clearInterval(interval);
  }, [state, questions]);

  const getVerdict = (s: number) => {
    if (s >= 90) return { label: "Twin Flames", icon: "🔥", color: "text-rose-600", bg: "bg-rose-50" };
    if (s >= 75) return { label: "Soulbound", icon: "✨", color: "text-pink-600", bg: "bg-pink-50" };
    if (s >= 60) return { label: "Perfect Harmony", icon: "🎵", color: "text-rose-500", bg: "bg-rose-50" };
    if (s >= 40) return { label: "Deeply Rooted", icon: "🌿", color: "text-indigo-500", bg: "bg-indigo-50" };
    return { label: "Unique Alchemy", icon: "🧪", color: "text-blue-500", bg: "bg-blue-50" };
  };

  const verdict = getVerdict(score);

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 pb-12">
      <div className="bg-white rounded-[3rem] shadow-2xl p-10 text-center border-t-[16px] border-rose-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 text-rose-100 rotate-12">
          <Heart size={200} fill="currentColor" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">Relationship DNA</h2>
          
          <div className="relative inline-flex mb-8">
             {/* Progress Ring with Glow */}
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 ${verdict.bg}`}></div>
            <svg className="w-56 h-56 transform -rotate-90">
              <circle cx="112" cy="112" r="100" stroke="#f1f5f9" strokeWidth="16" fill="transparent" />
              <circle
                cx="112" cy="112" r="100" stroke="url(#gradient)" strokeWidth="16" fill="transparent"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - score / 100)}
                strokeLinecap="round"
                className="transition-all duration-[2000ms] ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-gray-800 tracking-tighter">{score}%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Symmetry</span>
            </div>
          </div>

          <h3 className={`text-4xl font-black mb-4 ${verdict.color}`}>
            {verdict.label} {verdict.icon}
          </h3>
          
          <div className="flex justify-center items-center space-x-4 mt-8 py-3 px-6 bg-gray-50 rounded-2xl w-fit mx-auto border border-gray-100">
            <span className="text-sm font-bold text-rose-600 uppercase tracking-wider">{state.partner1Name}</span>
            <Heart size={16} className="text-rose-400" fill="currentColor" />
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">{state.partner2Name}</span>
          </div>
        </div>
      </div>

      {/* Match Highlights Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 sm:p-10 border-b-8 border-rose-100">
        <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
          <ThumbsUp size={22} className="mr-3 text-rose-500" />
          The Compatibility Highlights
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {matches.length > 0 ? matches.map((idx) => (
            <div key={idx} className="flex items-start p-4 bg-rose-50/50 rounded-2xl border border-rose-100 group hover:bg-rose-50 transition-colors">
              <div className="h-8 w-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <p className="text-[10px] text-rose-400 uppercase font-bold tracking-wider mb-0.5">You both agreed on</p>
                <p className="text-sm font-bold text-gray-800 leading-snug">{questions[idx].q}</p>
                <p className="text-xs text-rose-600 mt-1 italic">"{questions[idx].options[state.partner1Answers[idx]]}"</p>
              </div>
            </div>
          )) : (
            <p className="text-gray-400 italic text-sm col-span-2 text-center py-4">
              Opposites attract! You have unique perspectives on most things.
            </p>
          )}
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 sm:p-10 border-l-[12px] border-amber-400 relative">
        <div className="absolute top-8 right-10 text-amber-100">
          <Quote size={60} />
        </div>
        <div className="flex items-center mb-6 text-amber-600 relative z-10">
          <Sparkles size={28} className="mr-3" />
          <h4 className="text-2xl font-black">AI Love Analysis</h4>
        </div>

        {loadingAnalysis ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-100 rounded-full w-full"></div>
            <div className="h-4 bg-gray-100 rounded-full w-11/12"></div>
            <div className="h-4 bg-gray-100 rounded-full w-10/12"></div>
            <p className="text-sm font-bold text-amber-500 mt-6 animate-bounce text-center">{loadingMessage}</p>
          </div>
        ) : (
          <div className="prose prose-pink text-gray-700 leading-relaxed relative z-10">
            <div className="whitespace-pre-wrap font-medium text-lg leading-[1.7] opacity-90 italic">
              {analysis}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={onReset}
          className="bg-white hover:bg-gray-50 text-gray-600 font-bold py-5 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center transition-all active:scale-95 group"
        >
          <RotateCcw size={20} className="mr-2 group-hover:rotate-180 transition-transform duration-500" /> Start Over
        </button>
        <button
          onClick={() => window.print()}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center transition-all active:scale-95 shadow-rose-200"
        >
          <CheckCircle2 size={20} className="mr-2" /> Share Result
        </button>
      </div>

      <p className="text-center text-gray-400 text-[10px] mt-12 uppercase tracking-[0.2em] font-bold">
        Crafted with ❤️ and Gemini Intelligence
      </p>
    </div>
  );
};

export default Result;
