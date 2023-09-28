import mongoose from "mongoose";
import PetModel from "./models/Pets.js";

export async function getPets(req, res) {
  try {
    const pets = await PetModel.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function postPet(req, res) {
  const { name, type, age } = req.body;
  try {
    const newPet = new PetModel({
      name,
      type,
      age,
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function orderPet(req, res) {
  try {
    let order = req.params.order;
    if (order === "asc") {
      // get ascending order from db
      // console.log(order);
      const pets = await PetModel.find().sort({ age: 1 });
      res.json(pets);
    } else {
      if (order === "dsc") {
        // get descending order from db
        const pets = await PetModel.find().sort({ age: -1 });
        res.json(pets);
      } else {
        // get default order from db
        const pets = await PetModel.find();
        res.json(pets);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// ***********************************************
export async function buttons(req, res) {
  const parametrai = req.params;
  const types = parametrai.types;
  const order = parametrai.order;
  console.log("Buttons :", types, order, "Par:", parametrai);
  try {
    if (order === "asc") {
      // get ascending order from db
      // console.log(order);
      const pets = await PetModel.find({
        type: types.split(","),
      }).sort({ age: 1 });
      res.json(pets);
    } else {
      if (order === "dsc") {
        // get descending order from db
        const pets = await PetModel.find({
          type: types.split(","),
        }).sort({ age: -1 });
        res.json(pets);
      } else {
        // query db from multiple types
        const pets = await PetModel.find({
          type: types.split(","),
        });
        res.json(pets);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// export async function buttons(req, res) {
//   try {
//     const test = req.params;

//     console.log(test);
//     console.log(client);
//     const con = await client.connect();
//     const data = await con
//       .db("test")
//       .collection("pets")
//       .find({ type: { $in: req.params.types?.split(",") } })
//       .sort({ age: req.params.order?.toLowerCase() === "dsc" ? -1 : 1 })
//       .toArray();
//     console.log(data);
//     await con.close();
//     return res.send(data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error.message);
//   }
// }
