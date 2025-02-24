// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');



// Set up middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Database connection
mongoose.connect('mongodb+srv://test:JUsbjVWeZLxsA8U7@cluster0.innzwio.mongodb.net/REACTCONNECT', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => {
        console.error("Error occurred while connecting to MongoDB:", err);
    });



// Schema and Model
const answerSchema = new mongoose.Schema({
    answers: [String],
    cheatingLog: { type: Boolean, default: false },
    cheatingCount: { type: Number, default: 0 }, // To track cheating attempts
    timestamp: { type: Date, default: Date.now }, // To track submission time
});

const examupdates = mongoose.model('examupdates', answerSchema);

// Admin password for authentication
const ADMIN_PASSWORD = "Nithin123";


//submission timer
let timer;
const autoSubmitInterval = 3 * 60 * 1000;


// Welcome route
app.get("/app", (req, res) => {
    console.log("Welcome to the React app. You can write your exam here.");
    res.send("Welcome to the React exam app.");
});


// Route to start the timer and auto-submit answers
app.post('/app/start-exam', (req, res) => {
    const { answers } = req.body;

    // Clear 
    if (timer) clearTimeout(timer);

    // Start a 3-minute timer
    timer = setTimeout(async () => {
        const newAnswer = new examupdates({ answers });
        await newAnswer.save();
        console.log("Answers automatically submitted after 3 minutes.");
    }, autoSubmitInterval);

    res.json({ message: "Timer started. Exam will auto-submit in 3 minutes." });
});

// Route to manually submit answers
app.post('/app/submit-answers', async (req, res) => {
    const { answers } = req.body;

    // Clear timers
    if (timer) clearTimeout(timer);

    const newAnswer = new examupdates({ answers });
    await newAnswer.save();
    console.log("Answers submitted manually.");
    res.json({ success: true });
});


// Route to log cheating and close the application if cheating count reaches 3
app.post('/app/log-cheating', async (req, res) => {
    const log = await examupdates.findOneAndUpdate(
        {},
        { $inc: { cheatingCount: 1 }, cheatingLog: true },
        { new: true, upsert: true }
    );

    console.log("Cheating detected.");

    // Check if cheating count reaches 3
    if (log.cheatingCount >= 3) {
        console.log("Cheating detected 3 times. Closing application.");
        process.exit(1); // Exit the application
    }

    res.json({ success: true, cheatingCount: log.cheatingCount });
});

// Route to verify admin password
app.post('/app/verify-admin', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
