const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
      name: String,
      quantity: Number,
      price: Number,
      image:String
  }
],
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
