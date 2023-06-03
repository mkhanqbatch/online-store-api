import mongoose, { Schema } from "mongoose";
const sheetSchema = new Schema(
  {
    _id: {
      type: String,
    },
    productsAdded: {
      type: Boolean,
      default: false,
    },
    bucket: String,
    key: String,
    sellerId: String,
  },
  {
    timestamps: true,
  }
);
const XlsxSheet = mongoose.model("XlsxSheet", sheetSchema);
export default XlsxSheet;
