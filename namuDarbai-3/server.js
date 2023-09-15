import express from "express";
import cors from "cors";

const app = express();

const brandai = ["BMW", "VW", "Audi"];

// app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("server running on PORT 3000");
});
