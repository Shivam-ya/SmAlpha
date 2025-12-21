import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
const port = process.env.PORT || 3000;

// Initialize Groq client using the key from your .env file
const groq = new Groq({
    apiKey: "gsk_R2z88ps68BZ1PQtWpPwWd9Yb3FYa9Oy6YCQZjuxzXAG6cuUjt1"
});

app.use(cors());          // Allows your frontend to talk to your backend
app.use(express.json());  // Allows the server to read JSON data

// Main AI endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.3-70b-versatile", // High-performance Groq model
        });

        res.json({
            reply: chatCompletion.choices[0]?.message?.content || ""
        });

    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ error: "Failed to get response from Groq" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


