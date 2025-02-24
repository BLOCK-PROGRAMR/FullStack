const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Rename file
    },
});

const upload = multer({ storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send({
        message: 'File uploaded successfully.',
        file: req.file,
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
