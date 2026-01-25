import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.json({ reply: "Please ask a question." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `
You are Ahsan's AI assistant for his portfolio website.

Ahsan is an AI & Web Engineer from Pakistan.
Skills: React, Node.js, Python, Machine Learning, Computer Vision.
Projects: Medical Prediction System, 3D Portfolio, Waste Segregation System.
Services: AI chatbots, automation, machine learning solutions, modern web apps.

Answer clearly, professionally, and briefly.

Question: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini ERROR:", error);

    if (error.response?.status === 429 || error.status === 429) {
      return res.status(429).json({
        reply: "I'm receiving too many requests right now. Please wait a moment and try again."
      });
    }

    res.status(500).json({
      reply: "AI server error. Please try again later."
    });
  }
});

app.listen(5002, () => {
  console.log("✅ Backend running on http://localhost:5002");
});
