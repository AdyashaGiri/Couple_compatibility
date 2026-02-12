
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface WelcomeProps {
  onStart: (p1: string, p2: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (p1.trim() && p2.trim()) {
      onStart(p1, p2);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border-t-8 border-rose-500 transform transition-all hover:scale-[1.01]">
      <div className="mb-6 inline-flex p-4 bg-rose-50 rounded-full text-rose-500">
        <Heart size={48} fill="currentColor" />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-2">AmourAlign</h1>
      <p className="text-gray-500 mb-8 italic">Discover your relationship's unique rhythm</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Partner 1 Name</label>
            <input
              type="text"
              required
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              placeholder="e.g. Sarah"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="text-left">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Partner 2 Name</label>
            <input
              type="text"
              required
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              placeholder="e.g. Michael"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-lg"
        >
          Begin the Journey
        </button>
      </form>
      
      <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest font-bold">15 Questions • AI Powered Analysis</p>
    </div>
  );
};

export default Welcome;
