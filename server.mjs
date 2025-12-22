import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
// Render requires binding to process.env.PORT or default 10000
const port = process.env.PORT || 10000; 

// Middleware - MUST be before routes
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json()); // Essential for reading JSON from frontend requests

const groq = new Groq({ 
    apiKey: "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" // Ensure this is set in Render Env Variables
});

// Health check route for Render monitoring
app.get('/', (req, res) => res.send('SM ALPHA Server is Online'));

app.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;
        
        if (!message) {
            return res.status(400).json({ reply: "No message provided." });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: "You are SM ALPHA, a premium AI created and built by Shivam Yadav." 
                },
                ...history,
                { role: "user", content: message },
            ],
            model: "llama-3.3-70b-versatile",
        });

        res.json({ reply: chatCompletion.choices[0]?.message?.content || "" });
    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ reply: "I'm having trouble connecting to my brain. Please try again later!" });
    }
});

// Bind to 0.0.0.0 for Render public access
app.listen(port, "0.0.0.0", () => {
    console.log(`SM ALPHA Backend live on port ${port}`);
});
