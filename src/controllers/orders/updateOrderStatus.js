const { Order } = require("../../models/order");

const updateOrderStatus = async (orderId, orderStatus) => {
  const orders = await Order.updateOne(
    {
      _id: orderId,
    },
    {
      orderStatus: orderStatus,
    },
    { new: true }
  );
  return orders;
};
module.exports = { updateOrderStatus };
