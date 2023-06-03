import Product from "../../models/product";
import { Types } from "mongoose";
const AddProduct = async ({ name, price, asin, description, sellerId }) => {
  const oldProduct = await Product.findOne({ asin });
  if (oldProduct) {
    const err = new Error();
    err.error = "Product with ASIN already exists.";
    err.statusCode = 400;
    throw err;
  }
  const newProduct = new Product({
    _id: new Types.ObjectId().toHexString(),
    name,
    price,
    asin,
    description,
    sellerId,
  });
  newProduct.save();
  return {
    status: true,
    msg: "Product created Successfully ",
    product: newProduct,
  };
};
export default AddProduct;
