const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { catchError } = require("../../utils/catchError");
require("dotenv").config();

const signIn = async ({ email, password }) => {
  let oldUser = await User.findOne({ email });

  if (oldUser) {
    const passwordMatch = await bcrypt.compare(password, oldUser.password);
    if (passwordMatch) {
      let token = jwt.sign(
        { role: oldUser.role, id: oldUser._id },
        process.env.TOKEN_SECRET
      );
      return { status: true, msg: "Login Successfully ", user: oldUser, token };
    } else {
      const err = new Error();
      err.error = "Invalid Password";
      err.statusCode = 401;
      throw err;
    }
  } else {
    const err = new Error();
    err.error = "User not found";
    err.statusCode = 400;
    throw err;
  }
};
module.exports = { signIn };
