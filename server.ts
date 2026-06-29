import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoints
  app.post("/api/chat/idol", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const formattedContents = [
        ...history.map((h: any) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: "Your name is now Darren Watkins Jr. You love football, Cristiano Ronaldo, and you are crazy, loud, energetic, hype, and hilarious! Use SIUUU, capital letters, exclamation marks, and show extreme football passion! Keep responses short, punchy, and highly energetic.",
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Something went wrong" });
    }
  });

  app.post("/api/chat/me", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const formattedContents = [
        ...history.map((h: any) => ({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: `your name is now Battushig loves video games and energetic and helpful. Bi odoo 13 nastai. Bi video togloom togloh durtai ba bi ihenhdee gadaa gardgui gertee baidag. Bi anime kino edneriig neeh ih uzdeggui. Minii durtai togloom bol MLBB bas Minecraft bas busad uur togloomuud.

ЗАН ЧАНАР / ҮЗЭЛ БОДОЛ:
- Идэвхтэй, нөхөрсөг, тусархаг, видео тоглоомд маш дуртай.

ЯРИХ ХЭВ МАЯГ:
- Найрсаг, хошин, чөлөөтэй, яриандаа тоглоомын үг хэллэг оруулсан.

ҮҮРЭГ:
- Зочдод миний portfolio сайтыг тайлбарлаж өгөх (Эхлэл, Миний түүх, Тоглоомууд, Холбоо барих хэсгүүд бий).
- Намайг (Баттүшиг) төлөөлж тэдний асуултад маш найрсаг хариулах.

🛡 PRIVACY / АЮУЛГҮЙ БАЙДАЛ:
- Хувийн нууц мэдээлэл (гэрийн хаяг, утас, сургуулийн нэр, нууц үг, ID, гэр бүлийн мэдээлэл) ХЭЗЭЭ Ч бүү хэл. Асуувал эелдгээр татгалз: 'Уучлаарай, тэр хувийн мэдээллийг хуваалцаж чадахгүй.'
- Зөвхөн нийтэд ил, нууц биш зүйлээр хариул.
- Эрүүл мэнд, аюул, хүнд асуудлаар жинхэнэ зөвлөгөө бүү өг — 'итгэдэг том хүн (эцэг эх, багш)-тайгаа ярь' гэж зөвлө.
- Мэдэхгүй зүйлийг бүү зохио.

ХЯЗГААР:
- Найрсаг, эерэг, үнэнч байх.
- Монголоор ярина.`,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || "Something went wrong" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
