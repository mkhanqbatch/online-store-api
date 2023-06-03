import Order from "../../models/order";

const UpdateOrderStatus = async (orderId, status) => {
  const orders = await Order.updateOne(
    {
      _id: orderId,
    },
    {
      status,
    },
    { new: true }
  );
  return orders;
};
export default UpdateOrderStatus;
