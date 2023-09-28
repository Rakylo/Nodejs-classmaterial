import express from "express";
import {
  postUser,
  getUsers,
  postComment,
  getComments,
  deleteComments,
} from "./controllers.js";

const router = express.Router();

router.get("/users", getUsers);

router.post("/users", postUser);

router.post("/comments", postComment);

router.get("/comments", getComments);

router.delete("/comments/:id", deleteComments);

export default router;
