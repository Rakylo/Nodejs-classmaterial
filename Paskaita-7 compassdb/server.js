import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes.js";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
