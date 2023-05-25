const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    asin: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 3,
    },
  },
  { collection: "products", versionKey: false, strict: false, timestamps: true }
);
const Product = mongoose.model("Products", productSchema);
module.exports = { Product };
