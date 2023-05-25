const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { collection: "orders", versionKey: false, strict: false, timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
