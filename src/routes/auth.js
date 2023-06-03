import {
  SignIn,
  SignUp,
  CancelSubscription,
  SetSubscription,
} from "../controllers/auth/index";
import express from "express";
import catchError from "../utils/catchError";
const router = express.Router();

router.post("/signUp", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let response = await SignUp({ name, email, password });
    return res.json(response);
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const { email, password } = req.body;
    let response = await SignIn({ email, password });
    return res.json(response);
  } catch (err) {
    catchError({ res, err });
  }
});

router.post("/setSubscription", async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;
    console.log("in body ", req.body);
    let response = await SetSubscription({ userId, subscriptionId });
    return res.json(response);
  } catch (err) {
    catchError({ res, err });
  }
});
router.post("/cancelSubscription", async (req, res) => {
  try {
    const {
      data: {
        object: { id },
      },
    } = req.body;
    const response = await CancelSubscription(id);
    return res.json(response);
  } catch (err) {
    catchError({ res, err });
  }
});
export default router;
