
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getContextualStatus(city: string, time: string, activity: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a lifestyle assistant for a Mac Mini world clock. 
      Generate a short (max 10 words) creative status update in Chinese for someone in ${city}.
      The current time is ${time} and they are likely ${activity}.
      Example: "硅谷的午后，咖啡杯里盛满了灵感。"
      Keep it poetic and cozy.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Gemini Error:", error);
    return "时刻连接，跨越山海。";
  }
}
