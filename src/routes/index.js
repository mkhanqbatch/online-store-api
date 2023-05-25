const authRoutes = require("./auth");
const productRoutes = require("./product");
const order = require("./order");
const stripe = require("./stripe");
module.exports = { authRoutes, productRoutes, order, stripe };
