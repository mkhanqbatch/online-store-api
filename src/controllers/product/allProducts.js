const { Product } = require("../../models/product");

const allProducts = async (sellerId = 0) => {
  let products = [];
  if (sellerId) {
    console.log("hello", sellerId);
    products = await Product.find({ sellerId });
    return {
      status: true,
      msg: "All Products",
      products,
    };
  }
  products = await Product.find({});
  return {
    status: true,
    msg: "All Products",
    products,
  };
};
module.exports = allProducts;
