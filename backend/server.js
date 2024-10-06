const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require('./routes/Auth');
const courseRouter = require('./routes/course');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("api/courses", courseRouter);

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
