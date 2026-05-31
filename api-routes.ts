import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { logInteraction, getAnalytics } from "./src/lib/firebase-server.js";

dotenv.config();

const router = express.Router();

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

router.get("/analytics", async (req, res) => {
  const analytics = await getAnalytics();
  res.json(analytics);
});

// --- AI Endpoints ---

router.post("/story", async (req, res) => {
  try {
    const { verse, language } = req.body;
    
    await logInteraction('verse', verse, language || 'Unknown');

    const prompt = `You are a knowledgeable and empathetic Christian storyteller. For the Bible verse "${verse}":
1. First, provide the text of the verse translated into ${language}.
2. Then, provide a brief explanation of the verse.
3. Finally, create a short, engaging story that explains the historical background, context, and moral of the verse. Make it comforting, accessible, and narrative-driven.
Provide your entire response in ${language}.`;

    const response = await getAI().models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    
    res.json({ story: response.text });
  } catch (error) {
    console.error("Story API Error:", error);
    res.status(500).json({ error: `Failed to generate story: ${error instanceof Error ? error.message : String(error)}` });
  }
});

router.post("/solution", async (req, res) => {
  try {
    const { issue, language } = req.body;
    
    const issueLower = issue.toLowerCase();
    const themes = ["anxiety", "grief", "purpose", "stress", "family", "guilt", "fear", "loneliness", "anger", "faith"];
    const foundTheme = themes.find(t => issueLower.includes(t)) || "general";
    
    await logInteraction('issue', foundTheme, language || 'Unknown');

    const prompt = `You are a wise and empathetic Christian counselor. The user is struggling with: "${issue}". 
Analyze this issue and respond with relevant Bible verses and an encouraging explanation of how to apply the scripture to their life to find comfort and peace. 
Provide your response entirely in ${language}, and keep your tone compassionate and supportive. Use markdown formatting.`;

    const response = await getAI().models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    
    res.json({ solution: response.text });
  } catch (error) {
    console.error("Solution API Error:", error);
    res.status(500).json({ error: `Failed to generate solution: ${error instanceof Error ? error.message : String(error)}` });
  }
});

router.post("/daily-verse", async (req, res) => {
  try {
    const { language } = req.body;
    
    const prompt = `Provide a random, inspiring Bible verse for daily inspiration. Provide the verse text and the reference (e.g., John 3:16) in ${language}. Do not add any introductory or concluding text. Just the verse.`;

    const response = await getAI().models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    
    res.json({ verse: response.text });
  } catch (error) {
    console.error("Daily Verse API Error:", error);
    res.status(500).json({ error: `Failed to fetch daily verse: ${error instanceof Error ? error.message : String(error)}` });
  }
});

export default router;
