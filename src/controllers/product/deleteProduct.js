const { Product } = require("../../models/product");

const deleteProduct = async (id, sellerId) => {
  let oldProduct = await Product.findOne({ _id: id, sellerId });
  if (oldProduct) {
    try {
      let response = await Product.deleteOne({ _id: id, sellerId });
      return {
        status: true,
        msg: "Product is deleted Successfully.",
      };
    } catch (err) {
      throw err;
    }
  }
};
module.exports = deleteProduct;
