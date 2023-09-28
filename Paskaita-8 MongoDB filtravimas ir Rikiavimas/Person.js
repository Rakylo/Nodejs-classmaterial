import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
export default mongoose.model("Person", personSchema); // exportuojame modeli, kuris yra pagal personSchema
