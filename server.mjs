import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();

// Render auto sets PORT
const port = process.env.PORT || 10000;

// MUST use env variable
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// allow frontend domain
app.use(cors({
  origin: "https://shivam-ya.github.io",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// render test route
app.get("/", (req, res) => {
  res.send("API is online");
});

// main chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message required" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are SM ALPHA assistant."
        },
        {
          role: "user",
          content: message
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

    const reply = completion.choices?.[0]?.message?.content || "";

    res.json({ reply });

  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

