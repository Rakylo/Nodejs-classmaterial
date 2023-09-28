import { v4 as uuidv4 } from "uuid";
import ToDo from "./models/ToDo.js";

export async function getTodos(req, res) {
  try {
    const todos = await todo.find({}).project({
      id: "$_id",
      __v: 0,
    });
    const result = todos.map((todo) => ({
      title: todo.title,
      description: todo.description,
      id: todo._id,
    }));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTodoById(req, res) {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (todo) {
      res.json({ message: `todo with id ${id} deleted` });
    } else {
      res.status(404).json({ message: `todo with id ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export function updateTodoById(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = todos.findIndex((todo) => todo.id === id);

  todos[index] = {
    ...todos[index],
    title,
    description,
  };

  res.json({ message: "todo updated" });
}

export async function addTodo(req, res) {
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({
      title,
      description,
    });

    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
