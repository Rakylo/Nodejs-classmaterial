import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes.js";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
