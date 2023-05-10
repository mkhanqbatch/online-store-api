const { signUp, signIn } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
module.exports = router;
