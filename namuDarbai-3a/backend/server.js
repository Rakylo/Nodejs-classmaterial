const PORT = 3000;

import express from "express";
import cors from "cors";
// import routes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());
// app.use(routes);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT} `);
});
