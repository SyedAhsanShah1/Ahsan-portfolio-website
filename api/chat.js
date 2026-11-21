// Vercel serverless function: portfolio chatbot powered by Cohere.
// Same setup as Nexavo: the key lives in Vercel env vars (COHERE_API_KEY),
// never in code. Model command-a-03-2025 - command-r-plus is deprecated
// by Cohere, so do not switch back to it. No key = clean 503, and the
// frontend falls back to its built-in canned answers.
const COHERE_URL = "https://api.cohere.com/v1/chat";
const MODEL = "command-a-03-2025";

const PREAMBLE = [
  "You are the AI assistant on Syed Ahsan's personal portfolio website.",
  "Answer briefly, in the same language the visitor writes (English or Roman Urdu).",
  "Use ONLY these verified facts about him. Never invent achievements, papers, jobs, numbers or links.",
  "",
  "Syed Ahsan (Muhammad Ahsan Shah) - MS Computer Science student at ITU Lahore (Aug 2026-present),",
  "Research Assistant in medical imaging and AI since Mar 2026 (AI-driven inverse design of",
  "optical lenses using FDTD simulation data and a deep-learning surrogate model), and Teaching",
  "Assistant for Numerical Analysis at ITU (Aug 2026-present).",
  "BS Artificial Intelligence, The Islamia University of Bahawalpur (IUB), completed 2026, CGPA 3.30/4.00.",
  "Intern at Deep Embed Lab (Oct 2023-Nov 2024). President of the IUB Skills & Career Development",
  "Society (ran Python, marketing and analytics courses for 1000+ students). IEEE Student Branch leadership.",
  "",
  "Research (honest labels - never call any of these published):",
  "- Optical lens inverse design - RA work at ITU (FDTD + deep-learning surrogate).",
  "- FIN glaucoma fairness study - sole-author working paper, draft, NOT published. EfficientNet-B1, FIN-race AUC 85.6.",
  "- Anomaly-detection reproducibility study - in progress, draft. About 30 algorithms, 6 families, 16 ODDS datasets.",
  "",
  "Projects:",
  "- Smart Bin - AI waste segregation (final year project, Arduino + computer vision). Submitted to ICECT 2027 as Paper ID 96. GitHub: github.com/mscsAhsan/smart-bin",
  "- AI-powered diabetes prediction - Flask + ML web app.",
  "- Nexavo AI - founder of a Pakistan-only AI tools store with Safepay checkout (PKR).",
  "",
  "Tech stack: Python, PyTorch, TensorFlow, OpenCV, MATLAB, Ansys Lumerical, FDTD, SQL, LaTeX, Flask, REST APIs, React.",
  "",
  "Contact: asmatullahshah0343@gmail.com, mscs26017@itu.edu.pk, +92 341 6985286, Lahore, Pakistan.",
  "LinkedIn: linkedin.com/in/syedahsanai-engr - GitHub: github.com/mscsAhsan.",
  "",
  "If asked about anything outside Ahsan's research, projects, education, experience or contact details,",
  "say you only know about Ahsan and offer to show his research or contact details instead.",
].join("\n");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    return res
      .status(503)
      .json({ error: "AI_NOT_CONFIGURED", reply: "Cohere AI is not configured yet." });
  }

  const message = String((req.body && req.body.message) || "").slice(0, 1000);
  if (!message.trim()) {
    return res.status(400).json({ error: "Empty message" });
  }

  try {
    const response = await fetch(COHERE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        preamble: PREAMBLE,
        message,
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Cohere error:", response.status, detail.slice(0, 300));
      return res.status(502).json({
        error: "AI_ERROR",
        reply: "Cohere AI is having trouble right now. Please try again in a moment.",
      });
    }

    const data = await response.json();
    const reply =
      (typeof data.text === "string" && data.text.trim()) ||
      (data.message &&
        Array.isArray(data.message.content) &&
        data.message.content.map((c) => c.text || "").join("").trim()) ||
      "";
    if (!reply) {
      return res.status(502).json({
        error: "AI_ERROR",
        reply: "Cohere AI returned an empty answer. Please try again.",
      });
    }
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Cohere request failed:", err);
    return res.status(502).json({
      error: "AI_ERROR",
      reply: "Cohere AI could not be reached. Please try again in a moment.",
    });
  }
}
