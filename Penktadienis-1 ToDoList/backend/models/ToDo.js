import mongoose from "mongoose";

const todoSChema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  dataOfCreation: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default mongoose.model("Todo", todoSChema);
