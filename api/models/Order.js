import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  checkInDate: Date,
  checkOutDate: Date,
  totalPrice: Number,
  statusPay: String,
  // Thêm các trường khác nếu cần
});
export default mongoose.model("Order", orderSchema);
