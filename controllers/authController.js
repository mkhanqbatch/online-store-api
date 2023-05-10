const { Users } = require("../db/DbModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const signUp = async (req, res) => {
  try {
    const newUsers = new Users(req.body);
    await newUsers.save();
    return res.json("Congrats Your Profile is Created");
  } catch (e) {
    return res.statu(400).send(e);
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let oldUser = await Users.findOne({ email, password });
    if (oldUser) {
      let token = jwt.sign({ ...oldUser }, process.env.TOKEN_SECRET);
      return res.json({ status: true, user: oldUser, token });
    } else {
      res.json({
        status: false,
        message: "User not found",
      });
    }
  } catch (e) {
    return res.send(e);
  }
};
module.exports = { signUp, signIn };
