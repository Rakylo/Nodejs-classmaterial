import { names } from "./db.js";
import { cars } from "./db.js";
import { data } from "./db.js";

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

export function getBrand(req, res) {
  const { brands } = req.params;
  const carNames = cars[brands];
  console.log(carNames);
  res.json(carNames);
}

export function getData(req, res) {
  const { duomenys } = req.params;
  const allData = data.map((person) => person);
  console.log(allData);
  res.json({ allData });
}

export function getDataByCar(req, res) {
  const { masina } = req.params;
  const zmonesKurieTuri = data.filter((person) => person.car === masina);

  res.json({ zmonesKurieTuri });
}

export function getDataById(req, res) {
  const userId = parseInt(req.params.id);
  // req.params.id butent id turi sutapti su routes po :pavadinumu
  const user = data.find((person) => person.id === userId);
  res.json({ user });
}

export function getByEmail(req, res) {
  const emailId = req.params;
  const emails = data.map((person) => person.email);
  res.json({ emails });
}

export function femaleNameSurname(req, res) {
  const femaleNames = data
    .filter((person) => person.gender === "Female")
    .map((person) => `${person.first_name} ${person.last_name}`);

  res.json(femaleNames);
}

export function dviejuParametruUzklausa(req, res) {
  const minId = parseInt(req.query.minId); // Gauti minId iš requesto parametro ir konvertuoti į skaičių
  const maxId = parseInt(req.query.maxId); // Gauti maxId iš requesto parametro ir konvertuoti į skaičių

  // Filtruoti moteris (gender: Female) pagal minId ir maxId ir suformuoti vardų ir pavardžių masyvą
  const femaleNames = data
    .filter(
      (person) =>
        person.gender === "Male" && person.id >= minId && person.id <= maxId
    )
    .map((person) => `${person.first_name} ${person.last_name}`);

  res.json(femaleNames);
}

export function pagalUzklausa(req, res) {
  const gender = req.query.gender; // Gauti gender parametrą iš užklausos
  const car = req.query.car; // Gauti car parametrą iš užklausos

  // Filtruoti vardus ir pavardes pagal nurodytus parametrus
  const filteredNames = data
    .filter((person) => person.gender === gender && person.car === car)
    .map((person) => `${person.first_name} ${person.last_name}`);

  res.json(filteredNames);
}
