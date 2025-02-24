const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadImage(url, imagePath) {
    try {
        // Send a GET request to the image URL
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'  // stream format means we can receive the files like photos,videos and pdf format

        });

        // Save the image to a local file
        response.data.pipe(fs.createWriteStream(imagePath));

        // Log success message
        console.log('Image downloaded successfully to', imagePath);
    } catch (error) {
        console.error('Error downloading the image:', error);
    }
}

// Example usage
const imageURL = 'https://intranet.rguktn.ac.in/SMS/usrphotos/user/N210171.jpg'; // Replace with your image URL
const savePath = path.join(__dirname, 'downloaded_image.jpg'); // Path to save the image

downloadImage(imageURL, savePath);
