const express = require('express');
const cookieParser = require('cookie-parser');

//app for sending and receiving requests
const app = express();


//middleware for accessing cookies
app.use(cookieParser('superSecretKey'));

// Set a cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('Nithin', 'abc123', { httpOnly: true, secure: true, maxAge: 3600000 });
    res.send('Cookie set!');
});

// Get cookies
app.get('/get-cookies', (req, res) => {
    res.json({ cookies: req.cookies, signedCookies: req.signedCookies });
});

// Delete a cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('Nithin');
    res.send('Cookie deleted!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
