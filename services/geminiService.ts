
import { GoogleGenAI, Type } from "@google/genai";
import { Specialty, SymptomCheckResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function checkSymptoms(description: string): Promise<SymptomCheckResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze these symptoms and provide medical guidance: "${description}"`,
    config: {
      systemInstruction: "You are an AI Medical Triage Assistant. Analyze symptoms provided by users. Categorize the severity, suggest potential doctor specialties to visit, and provide general health recommendations. ALWAYS include a clear medical disclaimer that you are an AI and not a doctor. Return output in a structured JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          possibleSpecialties: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Suggested medical specialties based on symptoms (e.g., Cardiology, Dermatology)."
          },
          severity: {
            type: Type.STRING,
            description: "One of: LOW, MEDIUM, HIGH, EMERGENCY"
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of general health suggestions or next steps."
          },
          disclaimer: {
            type: Type.STRING,
            description: "A standard medical disclaimer."
          }
        },
        required: ["possibleSpecialties", "severity", "recommendations", "disclaimer"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse AI response:", e);
    return {
      possibleSpecialties: ["General Medicine"],
      severity: "LOW",
      recommendations: ["Please consult a doctor for an accurate diagnosis."],
      disclaimer: "AI guidance is for informational purposes only."
    };
  }
}

export async function getGeneralHealthAdvice(query: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  return response.text;
}
