const { newOrder } = require("./newOrder");
const { userOrders } = require("./userOrders");
const { sellerOrders } = require("./sellerOrders");
const { updateOrderStatus } = require("./updateOrderStatus");
module.exports = { newOrder, userOrders, sellerOrders, updateOrderStatus };
