const { addProduct, deleteProduct } = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

router.post("/addProduct", addProduct);
router.post("/deleteProduct", deleteProduct);
module.exports = router;