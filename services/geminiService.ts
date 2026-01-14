import { GoogleGenAI } from "@google/genai";
import { Deal } from '../types';

// Use strict process.env.API_KEY usage as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDealAnalysis = async (deal: Deal): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key missing. Cannot generate analysis.";
  }

  const prompt = `
    Analyze the following startup deal for a venture capital investment committee.
    
    Company: ${deal.companyName}
    One Liner: ${deal.oneLiner}
    Sector: ${deal.sector.join(', ')}
    Metrics: Revenue ${deal.metrics.revenue}, Growth ${deal.metrics.growth}, Burn ${deal.metrics.burn}
    Current Thesis: ${deal.thesis}

    Please provide a concise structured memo covering:
    1. Market Opportunity
    2. Key Risks (Financial, Market, Execution)
    3. Suggested Due Diligence Questions
    
    Keep the tone professional, objective, and critical. Max 300 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate analysis. Please try again later.";
  }
};
