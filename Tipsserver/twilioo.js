
require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const app = express();

const port = 3000;

// Load Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Support JSON body parsing

// Simple validation function
const isValidPhoneNumber = (number) => /^\+\d{10,15}$/.test(number);

app.post('/send-sms', async (req, res) => {
    const { to, body } = req.body;

    if (!to || !body) {
        return res.status(400).json({ error: "Missing 'to' or 'body' parameters." });
    }

    if (!isValidPhoneNumber(to)) {
        return res.status(400).json({ error: "Invalid phone number format." });
    }

    try {
        await client.messages.create({
            body: body,
            to: to,
            from: "TXTLCL"// Store in .env
        });

        console.log("Message sent successfully");
        res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
        console.error("Failed to send message:", err.message);
        res.status(500).json({ error: "Failed to send message", details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
