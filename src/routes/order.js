import {
  NewOrder,
  UpdateOrderStatus,
  SellerOrders,
  UserOrders,
} from "../controllers/orders/index";
import express from "express";
import catchError from "../utils/catchError";

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
    let response = await NewOrder({
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
  const orders = await UserOrders(userId);
  return res.json(orders);
});

router.get("/sellerOrders", async (req, res) => {
  const { sellerId } = req.query;
  const orders = await SellerOrders(sellerId);
  return res.json(orders);
});

router.post("/updateOrderStatus", async (req, res) => {
  const { orderId, status } = req.body;
  console.log("order id ,and status ", orderId, status);
  try {
    const order = await UpdateOrderStatus(orderId, status);
    return res.json(order);
  } catch (err) {
    catchError({ res, err });
  }
});
export default router;
