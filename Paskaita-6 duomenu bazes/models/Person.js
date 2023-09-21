import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const PersonModel = mongoose.model("Person", personSchema);

export default PersonModel;
