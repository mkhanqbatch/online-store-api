import catchError from "../utils/catchError";
import passport from "passport";

const checkRoles = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "customer") {
      const err = new Error();
      err.statusCode = 401;
      err.error = "You are not allowed to perform this action.";
      throw err;
    } else if (role == "seller") {
      return next();
    }
  } catch (err) {
    catchError({
      res,
      err,
    });
  }
};
const checkAuthentication = passport.authenticate("jwt", { session: false });
export { checkRoles, checkAuthentication };
