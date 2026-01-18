const express = require('express');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');

const app = express();
app.use(cors());
app.use(express.json());

const hf = new HfInference("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");

app.post('/chat', async (req, res) => {
  try {
    const { query, context } = req.body;
    
    // Trying a more stable model (Qwen or Llama)
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-72B-Instruct", 
      messages: [
        { role: "system", content: context },
        { role: "user", content: query }
      ],
      max_tokens: 250,
    });

    res.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error("HF Error:", error.message);
    res.status(500).json({ error: "AI is busy, please try again." });
  }
});

// Port check: Make sure this is 5000
app.listen(5000, '0.0.0.0', () => console.log('🚀 Server is LIVE on port 5000'));