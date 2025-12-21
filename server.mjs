import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
// Render automatically provides a PORT environment variable
const port = process.env.PORT || 10000; 

const groq = new Groq({ 
    apiKey: "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" // Securely pulled from Render settings
});

// Configure CORS to allow your GitHub Pages site
app.use(cors({
    origin: 'https://shivam-ya.github.io' 
}));

app.use(express.json()); 

// Health check endpoint
app.get('/', (req, res) => res.status(200).send("API is online"));

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await groq.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: "You are SM ALPHA, a professional AI assistant. Provide structured responses using Markdown." 
                },
                { role: "user", content: message },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
        });

        res.json({ reply: completion.choices[0]?.message?.content || "" });
    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ error: "Failed to fetch response" });
    }
});

app.listen(port, () => console.log(`🚀 Server live on port ${port}`));
