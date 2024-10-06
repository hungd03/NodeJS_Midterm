const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => res.end("Hello World"));


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); 
        console.log("MongoDB connected");

        app.listen(port, () => {
            console.log("Server is running on port " + port);
        });

    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

connectDB();
