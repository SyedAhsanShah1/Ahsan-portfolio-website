import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.json({ reply: "Please ask a question." });
  }

  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `<s>[INST]
You are Ahsan's AI assistant for his portfolio website.

Ahsan is an AI & Web Engineer from Pakistan.
Skills: React, Node.js, Python, Machine Learning, Computer Vision.
Projects: Medical Prediction System, 3D Portfolio, Waste Segregation System.
Services: AI chatbots, automation, machine learning solutions, modern web apps.

Answer clearly, professionally, and briefly.

Question: ${message}
[/INST]`,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.5
          },
          options: {
            wait_for_model: true
          }
        })
      }
    );

    const data = await hfRes.json();

    /* -------- SMART RESPONSE EXTRACTION -------- */

    let reply = "";

    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    } else if (typeof data.generated_text === "string") {
      reply = data.generated_text;
    }

    // Clean model junk / prompt
    reply = reply
      .replace(/<s>\[INST\][\s\S]*?\[\/INST\]/g, "")
      .replace(/Question:.*$/g, "")
      .trim();

    // Fallback (never empty)
    if (!reply) {
      reply =
        "I can help you with Ahsan's services, projects, tech stack, or contact details.";
    }

    res.json({ reply });
  } catch (error) {
    console.error("HF ERROR:", error);
    res.status(500).json({
      reply: "AI server error. Please try again later."
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
