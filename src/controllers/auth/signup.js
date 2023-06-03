import User from "../../models/user";
import jsonwebtoken from "jsonwebtoken";
import { Types } from "mongoose";

const SignUp = async ({ name, email, password }) => {
  //hasing password
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    const err = new Error();
    err.error = "Email Already is exists";
    err.statusCode = 400;
    throw err;
  }
  const newUser = new User({
    _id: new Types.ObjectId().toHexString(),
    name,
    email,
    password,
  });
  await newUser.save();
  let token = jsonwebtoken.sign(
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
export default SignUp;
