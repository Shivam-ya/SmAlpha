import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
const port = process.env.PORT || 10000;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors({
  origin: "https://shivam-ya.github.io",
}));

app.use(express.json());

app.get("/", (req, res) => res.send("API is online"));

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

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

    res.json({
      reply: completion.choices[0].message?.content || ""
    });
  } catch (error) {
    console.log("Groq error:", error);
    res.status(500).json({
      error: "API failed – check Render logs"
    });
  }
});

app.listen(port, () =>
  console.log(`🚀 Server running on port ${port}`)
);
;
