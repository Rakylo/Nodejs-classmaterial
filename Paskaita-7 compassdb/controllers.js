import mongoose from "mongoose";
import Car from "./models/Car.js";

export async function createCar(req, res) {
  const { year, make } = req.body;

  try {
    const newCar = new Car({
      year,
      make,
    });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCars(req, res) {
  const { make, year } = req.query;
  try {
    const query = {};
    if (make) {
      query.make = make;
    }

    if (year) {
      query.year = year;
    }

    const cars = await Car.find(query, { __v: 0 });

    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCarById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: `Invalid id ${id}` });
  }
  try {
    const car = await Car.findById(id, { __v: 0 });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: `Car with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateById(req, res) {
  const { id } = req.params;
  const { make, year } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: `Invalid id ${id}` });
  }
  try {
    const car = await Car.findById(id);
    if (car) {
      if (make) {
        car.make = make;
      }
      if (year) {
        car.year = year;
      }
      await car.save();
      res.json(car);
    } else {
      res.status(404).json({ message: `Car with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: `Invalid id ${id}` });
  }
  try {
    const response = await Car.findByIdAndDelete(id);

    if (response) {
      res.json({ message: "Car deleted" });
    } else {
      res.status(404).json({ message: `Car with id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
