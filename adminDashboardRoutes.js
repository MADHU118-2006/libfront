import express from "express";
import auth from "../middleware/auth.js";
import { 
  getAllBooks, 
  getAllUsers, 
  getAllReservations 
} from "../controllers/adminDashboardController.js";

const router = express.Router();

// Admin – Get all books
router.get("/books", auth, getAllBooks);

// Admin – Get all users
router.get("/users", auth, getAllUsers);

// Admin – Get all reservations
router.get("/reservations", auth, getAllReservations);

export default router;