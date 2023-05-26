const {
  signIn,
  signUp,
  setSubscription,
  cancelSubscription,
} = require("../controllers/auth");
const express = require("express");
const { catchError } = require("../utils/catchError");
const router = express.Router();
router.post("/signUp", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let response = await signUp({ name, email, password });
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
    let response = await signIn({ email, password });
    return res.json(response);
  } catch (err) {
    catchError({ res, err });
  }
});

router.post("/setSubscription", async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;
    let response = await setSubscription({ userId, subscriptionId });
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
    const response = await cancelSubscription(id);
    return res.json(response);
  } catch (err) {
    catchError({ res, err });
  }
});
module.exports = router;
