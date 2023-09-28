import express from "express";
import { deleteById, deleteByName, addPerson } from "./controllers.js";

const router = express.Router();

router.get("/person", addPerson);

router.delete("/person/:id", deleteById);

router.delete("/people/:name", deleteByName);

export default router;
