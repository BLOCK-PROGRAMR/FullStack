const express = require('express');
//const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;

// Middleware is used to handle request for incoming and outcoming
app.use(bodyParser.json());
app.use(express.json());

// Store OTP in memory 
let otpStorage = {};

app.post('/send-otp', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    // Save OTP with a timestamp because otp expires with in 5 minutes
    otpStorage[email] = {
        otp: otp,
        timestamp: Date.now()
    };
    console.log("OTP:" + otp);

    // Send OTP using email using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lpun490@gmail.com',
            pass: 'yxot zoeo qnrk zhsv',
        },
    });

    const mailOptions = {
        from: 'lpun490@gmail.com',
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP code is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ message: 'Error sending OTP' });
        }
        res.send({ message: 'OTP sent successfully!' });
    });
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).send({ message: 'Email and OTP are required' });
    }

    const storedOtp = otpStorage[email];

    if (!storedOtp) {
        return res.status(404).send({ message: 'OTP not found for this email' });
    }

    // Check if OTP is expired (set expiry time to 5 minutes)
    const timeElapsed = Date.now() - storedOtp.timestamp;
    if (timeElapsed > 5 * 60 * 1000) {
        return res.status(400).send({ message: 'OTP has expired' });
    }

    // Verify the OTP
    if (storedOtp.otp === otp) {
        res.send({ message: 'OTP verified successfully!' });
        // Clear OTP after successful verification
        delete otpStorage[email];
    } else {
        res.status(400).send({ message: 'Invalid OTP' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
