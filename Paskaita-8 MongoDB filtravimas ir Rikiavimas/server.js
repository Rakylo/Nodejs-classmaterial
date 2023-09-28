import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Person from "./Person.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const app = express();

app.get("/", async (req, res) => {
  try {
    const people = await Person.find({ $or: [{ age: 26 }, { name: "Jonas" }] });
    // .sort({ age: -1, name: 1 })
    // .limit(2)
    // .skip(2);
    res.json(people);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
