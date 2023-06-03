import User from "../../models/user";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const SignIn = async ({ email, password }) => {
  let oldUser = await User.findOne({ email });

  if (oldUser) {
    const passwordMatch = await bcrypt.compare(password, oldUser.password);
    if (passwordMatch) {
      let token = jsonwebtoken.sign(
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
export default SignIn;
