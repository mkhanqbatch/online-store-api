const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "users", versionKey: false, strict: false }
);
const Users = mongoose.model("Users", userSchema);

const productSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "products", versionKey: false, strict: false }
);
const Products = mongoose.model("Products", productSchema);
module.exports = { Users, Products };
