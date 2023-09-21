import { v4 as uuidv4 } from "uuid";
import { todos } from "./db.js";

export function getTodos(req, res) {
  res.json(todos);
}

export function deleteTodoById(req, res) {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === +id);

  todos.splice(index, 1);

  res.json({ message: `todo with id ${id} deleted` });
}

export function updateTodoById(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = todos.findIndex((todo) => todo.id === +id);

  todos[index] = {
    ...todos[index],
    title,
    description,
  };

  res.json({ message: "todo updated" });
}

export function addTodo(req, res) {
  const { title, description } = req.body;
  const id = uuidv4();
  console.log(id);
  const newTodo = {
    title,
    description,
  };

  todos.push(newTodo);
  res.json(newTodo);
}
