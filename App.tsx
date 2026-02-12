
import React, { useState } from 'react';
import { AppStep, QuizState } from './types';
import { QUESTIONS } from './constants';
import Welcome from './components/Welcome';
import Quiz from './components/Quiz';
import Result from './components/Result';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [state, setState] = useState<QuizState>({
    partner1Name: '',
    partner2Name: '',
    partner1Answers: [],
    partner2Answers: [],
  });

  const handleStart = (p1: string, p2: string) => {
    setState(prev => ({ ...prev, partner1Name: p1, partner2Name: p2 }));
    setStep(AppStep.QUIZ_PARTNER_1);
  };

  const handlePartner1Complete = (answers: number[]) => {
    setState(prev => ({ ...prev, partner1Answers: answers }));
    setStep(AppStep.QUIZ_PARTNER_2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePartner2Complete = (answers: number[]) => {
    setState(prev => ({ ...prev, partner2Answers: answers }));
    setStep(AppStep.RESULTS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setState({
      partner1Name: '',
      partner2Name: '',
      partner1Answers: [],
      partner2Answers: [],
    });
    setStep(AppStep.WELCOME);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <div className="transition-all duration-500 transform">
          {step === AppStep.WELCOME && (
            <Welcome onStart={handleStart} />
          )}

          {step === AppStep.QUIZ_PARTNER_1 && (
            <Quiz 
              partnerName={state.partner1Name} 
              questions={QUESTIONS} 
              onComplete={handlePartner1Complete} 
              colorTheme="rose"
            />
          )}

          {step === AppStep.QUIZ_PARTNER_2 && (
            <Quiz 
              partnerName={state.partner2Name} 
              questions={QUESTIONS} 
              onComplete={handlePartner2Complete} 
              colorTheme="blue"
            />
          )}

          {step === AppStep.RESULTS && (
            <Result 
              state={state} 
              questions={QUESTIONS} 
              onReset={handleReset} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
