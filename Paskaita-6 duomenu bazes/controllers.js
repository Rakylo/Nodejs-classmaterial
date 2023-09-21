import Person from "./models/Person.js";

export async function addNewPerson(req, res) {
  const { name, age } = req.body;

  try {
    const newPerson = new Person({
      name,
      age,
    });
    await newPerson.save();

    res.json(newPerson);
  } catch (error) {
    res.status(500).json({ error: error, message });
  }
}
