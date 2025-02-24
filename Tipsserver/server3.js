
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

//for parsing incoming and outcoming requests
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://test:JUsbjVWeZLxsA8U7@cluster0.innzwio.mongodb.net/REACTCONNECT", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema & Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Users = mongoose.model("Users", userSchema);

// Secret Key
const SECRET_KEY = 'NithiN@0987';

// Middleware to validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log("decoded format:", decoded);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await Users.findOne({ name: username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({ name: username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ name: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});
app.delete("/del/:name", async (req, res) => {
    const deldata = await Users.deleteOne({ name: req.params.name });
    console.log("deletename:" + deldata.name);
    return res.status(404).json({ message: "successfully delete the data!!" });
});
app.put("/update/:name", async (req, res) => {
    try {

        const user = await Users.findOne({ name: req.params.name });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's properties
        const { username, password } = req.body;
        user.name = username;
        user.password = await bcrypt.hash(password, 10);

        // Save to the dataBase
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "An error occurred while updating the user" });
    }
});


// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
