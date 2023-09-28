import Users from "./models/Users.js";
import Comments from "./models/Comments.js";

export async function postUser(req, res) {
  const { name, email } = req.body;
  try {
    const added = new Users({ name, email });

    await added.save();

    res.json(added);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await Users.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function postComment(req, res) {
  const { date, comment } = req.body;
  try {
    const added = new Comments({ date, comment });

    await added.save();

    res.json(added);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getComments(req, res) {
  try {
    const comments = await Comments.find();

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteComments(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Comments.findByIdAndDelete(id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
