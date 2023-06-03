import { CreateSubscription } from "../controllers/stripe/index";
import express from "express";
import catchError from "../utils/catchError";
const router = express.Router();

router.post("/createSubscription", async (req, res) => {
  try {
    const { priceId, email, name, paymentMethod } = req.body;
    let response = await CreateSubscription({
      priceId,
      email,
      name,
      paymentMethod,
    });
    return res.json(response);
  } catch (err) {
    catchError({ res, err });
  }
});
export default router;
