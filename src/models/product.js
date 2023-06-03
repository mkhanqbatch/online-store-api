import mongoose, { Schema } from "mongoose";
const productSchema = new Schema(
  {
    _id: {
      type: String,
    },
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
  { strict: false, timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
