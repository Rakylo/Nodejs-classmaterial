import express from "express";
import {
  createGroup,
  createPerson,
  addPersonToGroup,
  getGroupById,
} from "./controllers.js";

const router = express.Router();

router.post("/group", createGroup);

router.post("/person", createPerson);

router.put("/person/:personId/group/:groupId", addPersonToGroup);

router.get("/group/:id", getGroupById);

export default router;
