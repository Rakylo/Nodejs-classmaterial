import express from "express";
import { createPeople, getPeople } from "./controllers.js";

const router = express.Router();

router.get("/people", getPeople);

router.post("/people", createPeople);

export default router;
