const express = require('express');
const mongoose = require('mongoose');
const App = express();

// Connect mongoose.connect
//mongodb+srv://test:JUsbjVWeZLxsA8U7@cluster0.innzwio.mongodb.net/
mongoose.connect("mongodb+srv://test:JUsbjVWeZLxsA8U7@cluster0.innzwio.mongodb.net/REACTCONNECT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database is connected!!!");
}).catch((err) => {
    console.error("Database connection error:", err);
});



// define Schema
const bookSchema = new mongoose.Schema({
    name: String,
    pages: Number,
});

// Define the schema for Login details
const LoginSchema = new mongoose.Schema({
    image: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    skills: { type: String, required: true }
});



// Model definition
const Books = mongoose.model("library", bookSchema);
const WorkerDetails = mongoose.model('WorkerDetails', LoginSchema);

// Middleware to parse JSON
App.use(express.json());


App.get("/api/connecting/getdata", async (req, res) => {
    try {
        const data = await WorkerDetails.find();
        console.log(data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data: " + err.message);
    }
});
// Route to fetch all books
App.get("/app/books", async (req, res) => {
    try {
        console.log("received books");
        const data = await Books.find();
        console.log("Data received:", data);
        res.json(data);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

App.delete("/api/connecting/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await WorkerDetails.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
            res.status(200).json({ message: "User deleted successfully", deletedUser });
        }
    }
    catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Internal Server Error" }); // Return error message
    }
})
// Start the server
const PORT = 3000;
App.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});