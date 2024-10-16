const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/Auth");
const courseRouter = require("./routes/Course");

const NODE_PORT = process.env.NODE_PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routers
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    app.listen(NODE_PORT, () => {
      console.log(`Server is running at ${NODE_PORT}`);
    });
  } catch (err) {
    console.log("Could not connect do DB", err);
    process.exit(1);
  }
};

connectDB();
