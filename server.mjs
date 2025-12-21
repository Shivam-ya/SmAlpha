import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
const groq = new Groq({ apiKey:"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"});

app.use(cors({
    origin: 'https://shivam-ya.github.io' // Explicitly allow your frontend
}));
app.use(express.json());

app.get('/', (req, res) => res.sendStatus(200));

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await groq.chat.completions.create({
            messages: [{ role: "system", content: "You are SM ALPHA." }, { role: "user", content: message }],
            model: "llama-3.3-70b-versatile",
        });
        res.json({ reply: completion.choices[0]?.message?.content || "" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(process.env.PORT || 3000);
