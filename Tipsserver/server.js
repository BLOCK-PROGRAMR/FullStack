const xlsx = require("xlsx");
const { MongoClient } = require("mongodb");
const express = require("express");

const app = express();
const mongoose = require('mongoose');
app.use(express.json());// for accepting json format data
app.use(express.urlencoded({ extended: true }));//for receiving the url form data 
mongoose.connect("mongodb+srv://test:JUsbjVWeZLxsA8U7@cluster0.innzwio.mongodb.net/REACTCONNECT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database is connected!!!");
}).catch((err) => {
    console.error("Database connection error:", err);
});

const studentSeatingSchema = new mongoose.Schema({
    serialNumber: { type: Number, required: true },
    studentID: { type: String, required: true },
    studentName: { type: String, required: true },
    section: { type: String, required: true },
    deskPosition: { type: String, required: true },
    subject: { type: String, required: true },
    subjectCode: { type: String, required: true },
    seatingClass: { type: String, required: true },
    year: { type: String, required: true }
});
const libraries = mongoose.model("libraries", studentSeatingSchema);


//const uri = "mongodb+srv://test:JUsbjVWeZLxsA8U7@cluster0.innzwio.mongodb.net/REACTCONNECT";
// const collectionName = "sheeting2";

// const workbook = xlsx.readFile("sheeting2.xlsx");
// const sheetName = workbook.SheetNames[0];
// const worksheet = workbook.Sheets[sheetName];
// const data = xlsx.utils.sheet_to_json(worksheet);

// async function insertData() {
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");

//         const db = client.db();
//         const collection = db.collection(collectionName);

//         const result = await collection.insertMany(data);
//         console.log(`${result.insertedCount} records inserted successfully`);
//     } catch (error) {
//         console.error("Error inserting data:", error);
//     } finally {
//         await client.close();
//     }
// }

// insertData();


app.get("/app/details", async (req, res) => {
    try {
        const data = await libraries.find({ section: "E1CSE-01" });
        const studentNames = data.map(student => student.studentName);
        console.log(studentNames);
        res.json(studentNames);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("server is running on 3000 port number");
})

//db.libraries.find({ Section: "E1CSE-01",'Seating Class':"AB2-F2"})