const express = require("express");
const cors = require("cors");
// db connection
const DBConnection = require("./db/DbConnection");
// routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// passport
const passport = require("passport");
require("./controllers/passport");
//
const app = express();
app.use(cors());
app.use(express.json());
DBConnection();
app.use("/auth", authRoutes);
app.use("/users", passport.authenticate("jwt", { session: false }), userRoutes);
app.get("/", async (req, res) => {
  return res.json("Congrats");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("app is running");
});
