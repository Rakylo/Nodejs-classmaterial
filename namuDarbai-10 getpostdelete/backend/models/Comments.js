import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
  date: Date,
  comment: String,
});

export default mongoose.model("Comments", CommentsSchema);
