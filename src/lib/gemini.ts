import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Standard Flash model for fast, structured, intelligent outputs
export const GEMINI_MODEL = 'gemini-1.5-flash';

export function isGeminiConfigured(): boolean {
  return !!apiKey && apiKey.trim().length > 0;
}
