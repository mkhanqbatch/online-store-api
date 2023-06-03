import passport from "passport";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user";
passport.use(
  new JWTstrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    },
    function (jwtPayload, cb) {
      return User.findOne({ _id: jwtPayload.id })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
