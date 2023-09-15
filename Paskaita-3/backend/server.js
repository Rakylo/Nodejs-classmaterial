import express from "express";
import routes from "./routes.js";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(routes);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
