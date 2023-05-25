const express = require("express");
const cors = require("cors");
// db connection
const DBConnection = require("./config/DbConnection");
// routes
const {
  authRoutes,
  productRoutes,
  order,
  stripe,
} = require("./src/routes/index");
// passport
const { checkAuthentication } = require("./src/middleware/checkRoles");
const { sendSuccessOrderMail } = require("./src/utils/emailHandler");
require("./src/middleware/passport");
//models
require("./src/jobs/agenda");
//..

const app = express();
app.use(cors());
app.use(express.json());
DBConnection();
app.use("/auth", authRoutes);
app.use("/products", checkAuthentication, productRoutes);
app.use("/orders", checkAuthentication, order);
app.use("/stripe", checkAuthentication, stripe);
app.get("/", async (req, res) => {
  return res.json("Congrats");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("app is running");
});
