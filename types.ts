
export interface Question {
  id: number;
  q: string;
  options: string[];
}

export enum AppStep {
  WELCOME = 'WELCOME',
  QUIZ_PARTNER_1 = 'QUIZ_PARTNER_1',
  QUIZ_PARTNER_2 = 'QUIZ_PARTNER_2',
  RESULTS = 'RESULTS'
}

export interface QuizState {
  partner1Name: string;
  partner2Name: string;
  partner1Answers: number[];
  partner2Answers: number[];
}
