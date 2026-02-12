
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface QuizProps {
  partnerName: string;
  questions: Question[];
  onComplete: (answers: number[]) => void;
  colorTheme: 'rose' | 'blue';
}

const Quiz: React.FC<QuizProps> = ({ partnerName, questions, onComplete, colorTheme }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');

  const themeClasses = colorTheme === 'rose' 
    ? { 
        bg: 'bg-rose-500', 
        text: 'text-rose-600',
        border: 'border-rose-200',
        selectedOption: 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200',
        progress: 'bg-rose-500',
        card: 'border-rose-500'
      }
    : { 
        bg: 'bg-blue-500', 
        text: 'text-blue-600',
        border: 'border-blue-200',
        selectedOption: 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200',
        progress: 'bg-blue-500',
        card: 'border-blue-500'
      };

  const handleSelect = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIdx;
    setAnswers(newAnswers);
    
    if (currentIdx < questions.length - 1) {
      setTimeout(() => {
        setSlideDirection('right');
        setTimeout(() => {
          setCurrentIdx(prev => prev + 1);
          setSlideDirection('none');
        }, 150);
      }, 300);
    }
  };

  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className={`bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-10 border-t-[12px] ${themeClasses.card} transition-all duration-300`}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className={`h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-white ${themeClasses.bg} shadow-md`}>
            {currentIdx + 1}
          </div>
          <div>
            <h2 className={`text-xs font-bold uppercase tracking-[0.2em] ${themeClasses.text}`}>{partnerName}'s Session</h2>
            <p className="text-gray-400 text-[10px] font-medium">Question {currentIdx + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
           <Sparkles className={themeClasses.text} size={20} />
        </div>
      </div>

      <div className="w-full bg-gray-100 h-2.5 rounded-full mb-10 overflow-hidden p-0.5">
        <div 
          className={`h-full ${themeClasses.progress} rounded-full transition-all duration-700 ease-out shadow-sm`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className={`min-h-[380px] transition-all duration-200 ${slideDirection === 'right' ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 leading-[1.2]">
          {questions[currentIdx].q}
        </h3>

        <div className="grid gap-4">
          {questions[currentIdx].options.map((opt, i) => {
            const isSelected = answers[currentIdx] === i;
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden
                  ${isSelected ? themeClasses.selectedOption : 'border-gray-100 hover:border-gray-200 text-gray-700 bg-gray-50/50 hover:bg-white'}
                `}
              >
                <span className="font-semibold text-lg relative z-10">{opt}</span>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all z-10
                  ${isSelected ? 'bg-white border-white scale-110' : 'border-gray-300 group-hover:border-gray-400'}
                `}>
                  {isSelected && <div className={`h-2.5 w-2.5 rounded-full ${themeClasses.bg}`}></div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center border-t border-gray-100 pt-8">
        <button
          onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="flex items-center text-gray-400 font-bold hover:text-gray-600 disabled:opacity-0 transition-all uppercase text-xs tracking-widest"
        >
          <ChevronLeft size={18} className="mr-1" /> Previous
        </button>

        {currentIdx === questions.length - 1 ? (
          <button
            onClick={() => onComplete(answers)}
            disabled={answers.includes(-1)}
            className={`px-10 py-4 rounded-2xl text-white font-bold transition-all transform active:scale-95 shadow-xl text-lg
              ${!answers.includes(-1) ? `${themeClasses.bg} hover:brightness-110` : 'bg-gray-300 cursor-not-allowed'}
            `}
          >
            Complete Session
          </button>
        ) : (
          <button
            onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
            className={`flex items-center font-bold uppercase text-xs tracking-widest ${themeClasses.text} hover:brightness-90 transition-all`}
          >
            Next <ChevronRight size={18} className="ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
