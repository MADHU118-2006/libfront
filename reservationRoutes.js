import express from "express";
import auth from "../middleware/auth.js";
import { reserveBook, getUserReservations } from "../controllers/reservationController.js";

const router = express.Router();

router.post("/reserve", auth, reserveBook);
router.get("/user/:userId", auth, getUserReservations);

export default router;
