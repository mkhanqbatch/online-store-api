const { Product } = require("../../models/product");

const updateProduct = async ({
  _id,
  name,
  asin,
  price,
  description,
  sellerId,
}) => {
  console.log("name and id is ", name, _id, sellerId);
  let oldProduct = await Product.findOne({ asin, _id: { $ne: _id } });
  if (oldProduct) {
    const err = new Error();
    err.error = "Product with ASIN already exists.";
    err.statusCode = 400;
    throw err;
  }
  let updatedProduct = await Product.findOneAndUpdate(
    { _id, sellerId },
    { name, asin, price, description },
    {
      new: true,
    }
  );
  return {
    status: true,
    msg: "Product updated Successfully ",
    product: updatedProduct,
  };
};
module.exports = updateProduct;
