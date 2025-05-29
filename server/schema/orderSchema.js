const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  name: String,
  email: String,
  phone: Number,
  address: String,
  cityStateZip: String,
  cardNumber: String,
  expiryDate: String,
  cvv: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
