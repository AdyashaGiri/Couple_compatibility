
import { GoogleGenAI, Type } from "@google/genai";
import { QuizState, Question } from "../types";

export const analyzeCompatibility = async (state: QuizState, questions: Question[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const partner1Answers = state.partner1Answers.map((ansIdx, i) => ({
    question: questions[i].q,
    answer: questions[i].options[ansIdx]
  }));

  const partner2Answers = state.partner2Answers.map((ansIdx, i) => ({
    question: questions[i].q,
    answer: questions[i].options[ansIdx]
  }));

  const prompt = `
    Analyze the relationship compatibility between two people based on their quiz answers.
    
    Partner 1 (${state.partner1Name}): ${JSON.stringify(partner1Answers)}
    Partner 2 (${state.partner2Name}): ${JSON.stringify(partner2Answers)}

    Please provide a structured analysis including:
    1. A summary of their relationship "vibe".
    2. Specific areas where they align perfectly.
    3. Potential "Opposites Attract" dynamics or growth areas.
    4. A playful piece of relationship advice tailored to their specific answers.

    Keep it romantic, upbeat, and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.8,
      }
    });

    return response.text || "I couldn't generate the analysis right now, but your chemistry is clearly off the charts!";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "The stars are currently recalculating your destiny. Enjoy the connection!";
  }
};
