const express = require('express');
const app = express();

// Allowed IPs
const allowedIPs = ['::1', '::ffff:127.0.0.1']; // Add the IP addresses you want to allow

// Middleware to restrict by IP
app.use((req, res, next) => {
    const clientIP = req.ip;
    console.log(clientIP);// or req.headers['x-forwarded-for'] for proxied requests
    if (allowedIPs.includes(clientIP)) {
        next(); // Allow access
    } else {
        res.status(403).send('Access forbidden: Your IP is not allowed');
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the website');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});