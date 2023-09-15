import express from "express";
import { getTodos, deleteTodoById, updateTodoById } from "./controllers.js";

const router = express.Router();

router.get("/todo", getTodos);

router.delete("/todo/:id", deleteTodoById);

router.put("/todo/:id", updateTodoById);

export default router;
