const express = require("express");
const cors = require("cors");
// db connection
const DBConnection = require("./db/DbConnection");
// routes
const productRoutes = require("./routes/productRoutes");
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
app.use(
  "/product",
  passport.authenticate("jwt", { session: false }),
  productRoutes
);
app.get("/", async (req, res) => {
  return res.json("Congrats");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("app is running");
});
