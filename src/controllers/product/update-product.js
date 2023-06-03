import Product from "../../models/product";

const UpdateProduct = async ({
  _id,
  name,
  asin,
  price,
  description,
  sellerId,
}) => {
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
export default UpdateProduct;
