import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
  },
  surname: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    reguired: true,
  },
});

export default mongoose.model("Users", UsersSchema);
