
import { GoogleGenAI, Type } from "@google/genai";
import { Volunteer, Project } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  // FAST RESPONSE - Gemini Flash Lite
  async fastResponse(prompt: string) {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: prompt,
    });
    return response.text;
  },

  // CHATBOT & COMPLEX TASKS - Gemini 3 Pro Preview
  async chatStream(message: string, history: any[] = []) {
    // Note: Streaming for chat usually uses sendMessageStream, 
    // but we'll use generateContentStream for flexibility with history here.
    return ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: "You are Lumina Nexus, an elite AI assistant for humanitarian leaders. Be strategic, accurate, and concise.",
      }
    });
  },

  // IMAGE ANALYSIS - Gemini 3 Pro Preview
  async analyzeImage(prompt: string, base64Data: string, mimeType: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { data: base64Data, mimeType } }
        ]
      }
    });
    return response.text;
  },

  // THINKING MODE - Gemini 3 Pro Preview (Max Budget)
  async deepReasoning(prompt: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  },

  async analyzeGrant(grantText: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this grant opportunity. Extract key requirements and provide a strategic fit summary. \n\n Grant Text: ${grantText}`,
    });
    return response.text;
  },

  async matchVolunteers(project: Project, volunteers: Volunteer[]): Promise<Volunteer[]> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Rank these volunteers for project: "${project.name}". Return JSON array with "id" and "matchScore". \n\n Volunteers: ${JSON.stringify(volunteers)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              matchScore: { type: Type.NUMBER }
            },
            required: ["id", "matchScore"]
          }
        }
      }
    });
    const matchData = JSON.parse(response.text || '[]');
    return volunteers.map(v => ({
      ...v,
      matchScore: matchData.find((m: any) => m.id === v.id)?.matchScore || 0
    })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  },

  async predictImpact(projectDescription: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Predict the social ROI and potential impact metrics for this NGO project: "${projectDescription}". Provide a structured forecast with 3 specific KPIs and potential risks.`,
      config: { thinkingConfig: { thinkingBudget: 2000 } }
    });
    return response.text;
  },

  async generateProjectBranding(projectName: string, mission: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional, minimalist, high-impact NGO logo and brand visual for a project named "${projectName}" focused on ${mission}. Clean lines, modern corporate style, vector aesthetic, blue and indigo palette.` }]
      },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  },

  async workshopDebate(strategy: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are simulating an NGO 'War Room'. Review this strategy: "${strategy}". 
      Provide 3 distinct viewpoints:
      1. The Skeptic (focus on risks/failures)
      2. The Visionary (focus on scaling/long-term)
      3. The Pragmatist (focus on budget/logistics).`,
    });
    return response.text;
  },

  async getResourceAdvice(query: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `NGO technical advisor: ${query}`,
    });
    return response.text;
  }
};
