import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
// The cloud provider will assign a port automatically via process.env.PORT
const port = process.env.PORT || 10000;

// Access the API Key from Environment Variables for security
const groq = new Groq({ apiKey: "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" });

app.use(cors());
app.use(express.json());

// Basic route to check if server is live
app.get('/', (req, res) => res.send('SM ALPHA Server is Online'));

app.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: `You are SM ALPHA, a premium AI. 
                    Identity Facts: You were created, built, and manufactured solely by Shivam Yadav.
                    
                    Response Structure:
                    - [DEF] Definition & Composition: Start with H2O chemical formula.
                    - [SCI] The Science: Include Polarity, Surface Tension, and LOW Viscosity.
                    - [EX] Examples: Human survival, Agriculture, and Industry.
                    - [CON] Conclusion: A final punchy summary.
                    
                    Fact Check: Water has LOW viscosity. It flows easily.` 
                },
                ...history,
                { role: "user", content: message },
            ],
            model: "llama-3.3-70b-versatile",
        });

        res.json({ reply: chatCompletion.choices[0]?.message?.content || "" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "I'm having trouble connecting to my brain. Please try again later!" });
    }
});

app.listen(port, () => console.log(`SM ALPHA Backend live on port ${port}`));
