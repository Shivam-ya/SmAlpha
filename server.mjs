import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 10000;

// Load Key from Render Environment
const groq = new Groq({
  apiKey: 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
});

app.use(express.json());

app.use(
  cors({
    origin: "https://shivam-ya.github.io" // allow GitHub pages
  })
);

app.get("/", (req, res) => {
  res.status(200).send("API is online");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are SM ALPHA AI assistant." },
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile"
    });

    res.json({
      reply: completion.choices[0]?.message?.content || ""
    });
  } catch (err) {
    console.error("Groq API ERR:", err);
    res.status(500).json({ error: "API error" });
  }
});

app.listen(port, () => {
  console.log(`🔥 Server running on port ${port}`);
});

