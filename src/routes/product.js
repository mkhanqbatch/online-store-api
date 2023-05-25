const {
  addProduct,
  allProduct,
  deleteProduct,
  updateProduct,
  uploadFiles,
} = require("../controllers/product/index");
const express = require("express");
const { catchError } = require("../utils/catchError");
const { checkRoles } = require("../middleware/checkRoles");
const upload = require("../services/multerStorage");
const router = express.Router();

router.post("/addProduct", checkRoles, async (req, res) => {
  try {
    const { name, price, asin, description, sellerId } = req.body;
    let response = await addProduct({
      name,
      price,
      asin,
      description,
      sellerId,
    });
    return res.json(response);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});
router.post("/allProducts", async (req, res) => {
  const { sellerId } = req.body;
  try {
    let resp = await allProduct(sellerId);
    return res.json(resp);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});
router.post("/updateProduct", checkRoles, async (req, res) => {
  const { _id, name, asin, description, price, sellerId } = req.body;
  try {
    let resp = await updateProduct({
      _id,
      name,
      price,
      description,
      asin,
      sellerId,
    });
    return res.json(resp);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});
router.post("/deleteProduct", checkRoles, async (req, res) => {
  const { id, sellerId } = req.body;
  try {
    let resp = await deleteProduct(id, sellerId);
    return res.json(resp);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});
router.post("/uploadFile", checkRoles, upload, async (req, res) => {
  // console.log(req.files);
  const { sellerId } = req.body;
  try {
    let resp = await uploadFiles(req.files[0], sellerId);
    return res.json(resp);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});
module.exports = router;
