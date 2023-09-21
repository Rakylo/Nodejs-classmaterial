import express from "express";
import { getNames, postNames, deleteNames, putNames } from "./controllers.js";

const router = express.Router();

router.get("/", getNames);

router.post("/", postNames);

router.delete("/:id", deleteNames);

router.put("/:id", putNames);

export default router;
