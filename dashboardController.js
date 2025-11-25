import Book from "../models/Book.js";
import User from "../models/User.js";
import Reservation from "../models/Reservation.js"; // if you have reservation model

// Dashboard Summary API
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id; // user taken from token after middleware

    const totalBooks = await Book.countDocuments();
    const activeUsers = await User.countDocuments();
    const userReserved = await Reservation.countDocuments({ userId });

    res.json({
      totalBooks,
      activeUsers,
      reserved: userReserved,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
