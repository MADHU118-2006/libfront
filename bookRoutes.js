// Import required modules
import express from "express";
// Import authentication middleware
import auth from "../middleware/auth.js";
// Import Book model
import Book from "../models/Book.js";

const router = express.Router();

// ================================
// GET BOOKS (SEARCH + FILTER)
// ================================
router.get("/", async (req, res) => {
  const { search, category, availability } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { title: new RegExp(search, "i") },
      { author: new RegExp(search, "i") },
      { isbn: new RegExp(search, "i") }
    ];
  }

  if (category) query.category = category;
  if (availability) query.availability = availability;

  try {
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ================================
// RESERVE BOOK (AUTH REQUIRED)
// ================================
router.post("/reserve/:id", auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { availability: "Reserved" },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Reservation failed" });
  }
});

export default router;
