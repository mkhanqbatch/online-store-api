const mongoose = require("mongoose");
const sheetSchema = new mongoose.Schema(
  {
    productsAdded: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "xlsxSheets",
    versionKey: false,
    strict: false,
    timestamps: true,
  }
);
const XlsxSheet = mongoose.model("XlsxSheet", sheetSchema);
module.exports = { XlsxSheet };
