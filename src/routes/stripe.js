const {
  createSubscription,
  cancelSubscription,
} = require("../controllers/stripe/index");
const express = require("express");
const { catchError } = require("../utils/catchError");
const router = express.Router();
router.post("/createSubscription", async (req, res) => {
  try {
    const { priceId, email, name, paymentMethod } = req.body;
    let response = await createSubscription({
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
module.exports = router;
