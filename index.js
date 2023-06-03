import "dotenv/config";
import express from "express";
import cors from "cors";
import agenda from "./src/jobs/agenda";
import router from "./src/routes/index";

//db connection
import DbConnection from "./config/DbConnection";
const app = express();
// app.use(passport.initialize());
import "./src/middleware/passport";
app.use(cors({ origin: true }));
app.use(express.json());
DbConnection();
app.use("/v1", router);
app.listen(process.env.PORT || 5000, () => {
  console.log("app is running");
});
