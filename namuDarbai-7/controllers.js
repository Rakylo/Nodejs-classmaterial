import mongoose from "mongoose";
import Models from "./models/Models.js";

export async function getPeople(req, res) {
  const { firstName, lastName, age } = req.query;
  try {
    const query = {};
    if (firstName) {
      query.firstName = firstName;
    }

    if (lastName) {
      query.lastName = lastName;
    }
    if (age) {
      query.age = age;
    }

    const person = await Models.find(query, { __v: 0 });

    res.json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createPeople(req, res) {
  const { firstName, lastName, age } = req.body;
  try {
    const newPeople = new Models({
      firstName,
      lastName,
      age,
    });
    await newPeople.save();
    res.status(201).json(newPeople);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
