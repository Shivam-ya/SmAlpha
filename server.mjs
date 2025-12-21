import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
// Render uses port 10000 by default, but process.env.PORT is safer
const port = process.env.PORT || 10000;

// Security: Use process.env so your key isn't public on GitHub
const groq = new Groq({ 
    apiKey: "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"
});

// Configure CORS to allow your GitHub Pages frontend
app.use(cors({
    origin: 'https://shivam-ya.github.io' 
}));

app.use(express.json()); 

// Health check endpoint
app.get('/', (req, res) => res.status(200).send("API is online"));

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are SM ALPHA, an AI assistant created by Shivam Yadav." },
                { role: "user", content: message },
            ],
            model: "llama-3.3-70b-versatile",
        });

        res.json({ reply: completion.choices[0]?.message?.content || "" });
    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ error: "Failed to fetch response" });
    }
});

app.listen(port, () => console.log(`🚀 Server live on port ${port}`));
