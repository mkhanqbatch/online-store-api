import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  AllProducts,
  GetS3Url,
  SaveFileInfo,
} from "../controllers/product/index";
import express from "express";
import catchError from "../utils/catchError";
import { checkRoles } from "../middleware/checkRoles";
import upload from "../services/multerStorage";
const router = express.Router();

router.post("/addProduct", checkRoles, async (req, res) => {
  try {
    const { name, price, asin, description, sellerId } = req.body;
    let response = await AddProduct({
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
    let resp = await AllProducts(sellerId);
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
    let resp = await UpdateProduct({
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
    let resp = await DeleteProduct(id, sellerId);
    return res.json(resp);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});

router.post("/presigned-url", checkRoles, async (req, res) => {
  const { bucket, key } = req.body;
  try {
    let resp = await GetS3Url(bucket, key);
    return res.json(resp);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});

router.post("/save-file-info", checkRoles, async (req, res) => {
  const { bucket, key, sellerId } = req.body;
  console.log("File info ", req.body);
  try {
    let resp = await SaveFileInfo({
      sellerId,
      key,
      bucket,
    });
    return res.json(resp);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});
export default router;
