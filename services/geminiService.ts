import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from '../types';

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid immediate errors, though app logic handles missing keys
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateSolution = async (problem: string): Promise<GeminiResponse | null> => {
  if (!ai) {
    console.error("API Key is missing");
    throw new Error("API Key is missing. Please configure your environment.");
  }

  const prompt = `
    You are an expert Algorithms Engineer. Analyze the following DSA problem: "${problem}".
    Provide a brute force solution and an optimal solution in Python.
    Also provide a logical step-by-step flow that can be visualized as a flowchart.
    
    Return the response in strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            problemTitle: { type: Type.STRING },
            bruteForceCode: { type: Type.STRING, description: "Python code for brute force approach" },
            bruteForceComplexity: { type: Type.STRING, description: "Time and Space complexity (e.g. O(n^2))" },
            optimalCode: { type: Type.STRING, description: "Python code for optimal approach" },
            optimalComplexity: { type: Type.STRING, description: "Time and Space complexity (e.g. O(n))" },
            stepByStepFlow: {
              type: Type.ARRAY,
              description: "A list of logical steps representing the optimal algorithm flow.",
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING, description: "Short title of the step" },
                  detail: { type: Type.STRING, description: "Detailed explanation" },
                  isDecision: { type: Type.BOOLEAN, description: "True if this step involves an IF/ELSE check" }
                },
                required: ["step", "detail", "isDecision"]
              }
            }
          },
          required: ["problemTitle", "bruteForceCode", "bruteForceComplexity", "optimalCode", "optimalComplexity", "stepByStepFlow"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeminiResponse;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw