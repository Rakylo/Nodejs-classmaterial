import Person from "./models/Person.js";

export async function deleteById(req, res) {
  const { id } = req.params;
  try {
    const deleted = await Person.findByIdAndDelete(id);

    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteByName(req, res) {
  const { name } = req.params;
  try {
    const eliminated = await Person.deleteMany({ name });
    res.json(eliminated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function addPerson(req, res) {
  const { name, age } = req.body;
  try {
    const added = new Person({ name, age });

    await person.save();

    res.json(added);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function logger(req, res, next) {
  console.log("Request received");

  next();
}
