const { Products } = require("../db/DbModels");

const addProduct = async (req, res) => {
  return res.json("add product");
};
const updateProduct = async (req, res) => {
  return res.json("add product");
};
const deleteProduct = async (req, res) => {
  return res.json("delete Product");
};
module.exports = { addProduct, deleteProduct, updateProduct };
