import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import "dotenv/config";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["POST","GET"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// required for Render public binding
const PORT = process.env.PORT || 10000;

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY   // <-- FIX 1
});

app.get("/", (req, res) => {
    res.send("SM ALPHA Server is Online");
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ reply: "No message provided" });
        }

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "You are SM ALPHA created by Shivam Yadav" },
                { role: "user", content: message }
            ]
        });
const botReply = response.choices[0]?.message?.content;

res.json({
  reply: botReply && botReply.trim() !== ""
    ? botReply
    : "⚠️ I don't have live browser access, but I can explain current major topics."
});


    } catch (err) {
        console.error("Backend error:", err);
        res.status(500).json({ reply: "Error connecting to Groq API" });
    }
});

// 0.0.0.0 required for Render
app.listen(PORT, "0.0.0.0", () => {
    console.log("Backend running on", PORT);
});
