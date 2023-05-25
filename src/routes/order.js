const {
  userOrders,
  newOrder,
  sellerOrders,
  updateOrderStatus,
} = require("../controllers/orders/index");
const express = require("express");
const { catchError } = require("../utils/catchError");
const router = express.Router();
router.post("/newOrder", async (req, res) => {
  try {
    const {
      userId,
      products,
      address,
      orderNumber,
      subTotal,
      totalAmount,
      discount,
    } = req.body;
    let response = await newOrder({
      userId,
      products,
      address,
      orderNumber,
      subTotal,
      totalAmount,
      discount,
    });
    return res.json(response);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});
router.get("/userOrders", async (req, res) => {
  const { userId } = req.query;
  const orders = await userOrders(userId);
  return res.json(orders);
});
router.get("/sellerOrders", async (req, res) => {
  const { sellerId } = req.query;
  const orders = await sellerOrders(sellerId);
  return res.json(orders);
});
router.post("/updateOrderStatus", async (req, res) => {
  const { orderId, orderStatus } = req.body;
  try {
    const order = await updateOrderStatus(orderId, orderStatus);
    return res.json(order);
  } catch (err) {
    catchError({ res, err });
  }
});
module.exports = router;
