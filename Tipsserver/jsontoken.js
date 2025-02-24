const jwt = require('jsonwebtoken');

const SECRET_KEY = 'NithiN@0987';

// Function to generate a token
//payload means the data we are passing to the client to server and server to client
function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
    };

    // Generate a token with 1-hour expiry
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;
}

// Example Usage
const user = { id: 171, username: 'Nithinkumar' };
const token = generateToken(user);
console.log('Token:', token);
