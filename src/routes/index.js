import express from "express";
import { checkAuthentication } from "../middleware/checkRoles";
import auth from "./auth";
import order from "./order";
import product from "./product";
import stripe from "./stripe";
const router = express.Router();

router.use("/auth", auth);
router.use("/orders", checkAuthentication, order);
router.use("/products", checkAuthentication, product);
router.use("/stripe", stripe);

export default router;
