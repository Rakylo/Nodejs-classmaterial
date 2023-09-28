import express from "express";
import { getPets, orderPet, postPet, buttons } from "./controllers.js";

const router = express.Router();

router.get("/", getPets);

router.post("/", postPet);

//router.get("/:order", orderPet);

router.get("/:types?/:order?", buttons);

export default router;
