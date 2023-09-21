import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 99,
  },
});

export default mongoose.model("Models", peopleSchema);
