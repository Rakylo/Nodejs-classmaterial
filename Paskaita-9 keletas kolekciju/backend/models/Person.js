import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
});

export default mongoose.model("Person", PersonSchema);
