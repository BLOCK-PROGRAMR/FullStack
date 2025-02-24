const express = require("express");
const youtubedl = require("youtube-dl-exec");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.get("/trim", async (req, res) => {
    const videoUrl = "https://youtu.be/toVfvRhWbj8?si=8YIyBEn0IvsaKkmd"; // YouTube video URL
    const startTime = "00:08:58"; // Start time in HH:MM:SS format
    const duration = "23";       // Duration in seconds

    const outputFileName = `trimmed-video.mp4`; // Output file name
    const outputPath = path.join(__dirname, outputFileName); // Full path to the output file

    try {
        console.log("Downloading and trimming the video...");

        // Use youtube-dl-exec to download and trim the video
        await youtubedl(videoUrl, {
            output: outputPath,
            postprocessorArgs: [
                `-ss ${startTime}`, // Start time
                `-t ${duration}`,   // Duration
            ],
        });

        console.log("Video trimmed successfully. Sending the file...");

        // Serve the trimmed video file to the client
        res.download(outputPath, outputFileName, (err) => {
            if (err) {
                console.error("Error sending the file:", err.message);
            }
            // Delete the output file after serving
            fs.unlinkSync(outputPath);
        });
    } catch (err) {
        console.error("Error processing video:", err.message);
        res.status(500).send(`Error processing video: ${err.message}`);
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
