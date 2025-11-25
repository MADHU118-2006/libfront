import Book from "../models/Book.js";
import User from "../models/User.js";
import Reservation from "../models/Reservation.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("userId", "name email")
      .populate("bookId", "title author");

    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};
