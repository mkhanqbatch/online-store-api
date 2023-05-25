const { Product } = require("../../models/product");

const addProduct = async ({ name, price, asin, description, sellerId }) => {
  const oldProduct = await Product.findOne({ asin });
  // console.log("product is ", oldProduct);
  if (oldProduct) {
    const err = new Error();
    err.error = "Product with ASIN already exists.";
    err.statusCode = 400;
    throw err;
  }
  const newProduct = new Product({ name, price, asin, description, sellerId });
  newProduct.save();
  return {
    status: true,
    msg: "Product created Successfully ",
    product: newProduct,
  };
};
module.exports = addProduct;
