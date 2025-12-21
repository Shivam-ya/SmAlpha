import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
const port = process.env.PORT || 3000;

// Security: Use process.env for your key
const groq = new Groq({ 
    apiKey: "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"
});

app.use(cors()); 
app.use(express.json()); 

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a professional AI assistant like Gemini. 
                    Your goal is to provide systemic and structured responses.
                    
                    FORMATTING RULES:
                    1. Use '##' for main headers and '###' for sub-headers.
                    2. Use Markdown Tables for any data comparisons or chemical compositions.
                    3. Use bullet points for lists.
                    4. ALWAYS add two new lines between headers, paragraphs, and tables.
                    5. Never output a single long wall of text.`
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3, // Lower temperature makes formatting more consistent
        });

        res.json({ 
            reply: chatCompletion.choices[0]?.message?.content || "" 
        });
    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ error: "Failed to generate structured response" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});