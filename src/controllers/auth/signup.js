const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const signUp = async ({ name, email, password }) => {
  //hasing password
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    const err = new Error();
    err.error = "Email Already is exists";
    err.statusCode = 400;
    throw err;
  }
  const newUser = new User({ name, email, password });
  await newUser.save();
  let token = jwt.sign(
    { role: newUser.role, id: newUser._id },
    process.env.TOKEN_SECRET
  );
  return {
    status: true,
    msg: "User created Successfully ",
    user: newUser,
    token,
  };
};
module.exports = { signUp };
