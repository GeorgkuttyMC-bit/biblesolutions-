import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  // CORS Headers just in case
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Very basic routing based on URL ending
  const url = req.url || '';

  if (req.method === 'GET' && url.includes('/analytics')) {
    return res.status(200).json({
      totalInteractions: 0,
      languageMetrics: { English: 0 },
      popularVerses: {},
      commonThemes: {}
    });
  }

  if (req.method === 'POST' && url.includes('/story')) {
    try {
      const { verse, language } = req.body || {};
      
      const prompt = `You are a knowledgeable and empathetic Christian storyteller. Create a short, engaging story that explains the historical background, context, and moral of the Bible verse "${verse}". Provide your response entirely in ${language}. Make it comforting, accessible, and narrative-driven.`;

      const response = await getAI().models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });
      
      return res.status(200).json({ story: response.text });
    } catch (error) {
      console.error("Story API Error:", error);
      return res.status(500).json({ error: `Failed to generate story: ${error instanceof Error ? error.message : String(error)}` });
    }
  }

  if (req.method === 'POST' && url.includes('/solution')) {
    try {
      const { issue, language } = req.body || {};

      const prompt = `You are a wise and empathetic Christian counselor. The user is struggling with: "${issue}". 
Analyze this issue and respond with relevant Bible verses and an encouraging explanation of how to apply the scripture to their life to find comfort and peace. 
Provide your response entirely in ${language}, and keep your tone compassionate and supportive. Use markdown formatting.`;

      const response = await getAI().models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });
      
      return res.status(200).json({ solution: response.text });
    } catch (error) {
      console.error("Solution API Error:", error);
      return res.status(500).json({ error: `Failed to generate solution: ${error instanceof Error ? error.message : String(error)}` });
    }
  }

  return res.status(404).json({ error: "Route not found in Vercel handler" });
}
