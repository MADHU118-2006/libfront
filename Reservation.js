import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  reservedAt: { type: Date, default: Date.now },
  status: { type: String, default: "Reserved" }
});

export default mongoose.model("Reservation", reservationSchema);
