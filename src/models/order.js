import mongoose, { Schema } from "mongoose";

// Define the schema for the array object
const productsSchema = new Schema(
  {
    sellerId: String,
    asin: String,
  },
  { _id: false } // Exclude the auto-generated _id field
);

const orderSchema = new Schema(
  {
    _id: {
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    products: [productsSchema],
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Dispatched", "Delivered"],
      default: "Pending",
    },
    address: String,
    orderNumber: Number,
    subTotal: Number,
    discount: Number,
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
