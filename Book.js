// models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  isbn: { type: String },
  description: { type: String },
  availability: { type: String, default: "Available" }
});

export default mongoose.model("Book", bookSchema);
