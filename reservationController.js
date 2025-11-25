import auth from "../middleware/auth.js";   // ← added as you requested
import Reservation from "../models/Reservation.js";
import Book from "../models/Book.js";

export const reserveBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Check if already reserved
    const existing = await Reservation.findOne({ userId, bookId });
    if (existing) {
      return res.status(400).json({ message: "You already reserved this book" });
    }

    // Create reservation
    const reservation = await Reservation.create({ userId, bookId });

    // Update book availability
    await Book.findByIdAndUpdate(bookId, { availability: "Reserved" });

    res.status(201).json({
      message: "Book reserved successfully",
      reservation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error reserving book", error });
  }
};

export const getUserReservations = async (req, res) => {
  try {
    const { userId } = req.params;

    const reservations = await Reservation.find({ userId }).populate("bookId");

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
