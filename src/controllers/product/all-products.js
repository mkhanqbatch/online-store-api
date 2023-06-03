import Product from "../../models/product";

const AllProducts = async (sellerId = 0) => {
  let products = [];
  if (sellerId) {
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
export default AllProducts;
