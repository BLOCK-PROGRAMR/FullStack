
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'https://www.sitename.com',
                'X-Title': 'SiteName',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: 'deepseek/deepseek-r1:free', messages: [{ role: 'user', content: message }] }),
        });
        const data = await response.json();
        res.json({ response: data.choices?.[0]?.message?.content || 'No response received.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
