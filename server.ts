import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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

// --- In-Memory DB for Analytics ---
const analytics = {
  totalInteractions: 0,
  languageMetrics: { English: 0, Malayalam: 0, German: 0 } as Record<string, number>,
  popularVerses: {} as Record<string, number>,
  commonThemes: {} as Record<string, number>
};

app.post("/api/analytics/interaction", (req, res) => {
  analytics.totalInteractions++;
  res.json({ success: true });
});

app.post("/api/analytics/language", (req, res) => {
  const { lang } = req.body;
  if (lang && analytics.languageMetrics[lang] !== undefined) {
    analytics.languageMetrics[lang]++;
  }
  res.json({ success: true });
});

app.post("/api/analytics/verse", (req, res) => {
  const { verse } = req.body;
  if (verse) {
    analytics.popularVerses[verse] = (analytics.popularVerses[verse] || 0) + 1;
  }
  res.json({ success: true });
});

app.get("/api/analytics", (req, res) => {
  res.json(analytics);
});

// --- AI Endpoints ---

app.post("/api/story", async (req, res) => {
  try {
    const { verse, language } = req.body;
    
    // Attempt to log theme/verse based on basic analytics
    analytics.totalInteractions++;
    if (verse) {
       analytics.popularVerses[verse] = (analytics.popularVerses[verse] || 0) + 1;
    }

    const prompt = `You are a knowledgeable and empathetic Christian storyteller. Create a short, engaging story that explains the historical background, context, and moral of the Bible verse "${verse}". Provide your response entirely in ${language}. Make it comforting, accessible, and narrative-driven.`;

    const response = await getAI().models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    
    res.json({ story: response.text });
  } catch (error) {
    console.error("Story API Error:", error);
    res.status(500).json({ error: `Failed to generate story: ${error instanceof Error ? error.message : String(error)}` });
  }
});

app.post("/api/solution", async (req, res) => {
  try {
    const { issue, language } = req.body;
    
    analytics.totalInteractions++;
    
    // Extract a simple theme from the issue (very naïve but works for simple analytics)
    const issueLower = issue.toLowerCase();
    const themes = ["anxiety", "grief", "purpose", "stress", "family", "guilt", "fear", "loneliness", "anger", "faith"];
    const foundTheme = themes.find(t => issueLower.includes(t)) || "general";
    analytics.commonThemes[foundTheme] = (analytics.commonThemes[foundTheme] || 0) + 1;

    const prompt = `You are a wise and empathetic Christian counselor. The user is struggling with: "${issue}". 
Analyze this issue and respond with relevant Bible verses and an encouraging explanation of how to apply the scripture to their life to find comfort and peace. 
Provide your response entirely in ${language}, and keep your tone compassionate and supportive. Use markdown formatting.`;

    const response = await getAI().models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    
    res.json({ solution: response.text });
  } catch (error) {
    console.error("Solution API Error:", error);
    res.status(500).json({ error: `Failed to generate solution: ${error instanceof Error ? error.message : String(error)}` });
  }
});


// --- Vite Middleware & Fallback ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only start listen if not in a serverless environment
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

startServer();

export default app;
