import { names } from "./db.js";

export function getNames(req, res) {
  res.json(names);
}
export function postNames(req, res) {
  const { name, age, gender } = req.body;
  const highestId = Math.max(...names.map((person) => person.id));
  const newId = highestId + 1; // Calculate the new ID
  console.log(name, age, gender);
  names.push({
    id: newId, // Use the new calculated ID
    name,
    age,
    gender,
  });
  res.json(names);
}

export function deleteNames(req, res) {
  const id = req.params.id;
  const index = names.findIndex((person) => person.id == +id);

  if (index === -1) {
    // Person with the given ID was not found
    res.status(404).json({
      message: "Person not found",
    });
  } else {
    // Person with the given ID found, delete it
    names.splice(index, 1);
    res.json({
      message: "Person has been deleted",
    });
  }
}

export function putNames(req, res) {
  const id = req.params.id;
  const index = names.findIndex((person) => person.id == +id);

  if (index === -1) {
    // Person with the given ID was not found
    res.status(404).json({
      message: "Person not found",
    });
  } else {
    const { name, age, gender } = req.body;
    console.log(name, age, gender);
    names[index] = {
      ...names[index],
      name,
      age,
      gender,
    };
    res.json({
      message: "Person has been updated",
    });
  }
}
