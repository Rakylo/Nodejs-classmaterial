import express from 'express';
import dotenv from 'dotenv';
import routes from './routes.js';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
