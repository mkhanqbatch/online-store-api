const { Order } = require("../../models/order");
const { sendSuccessOrderMail } = require("../../utils/emailHandler");
const newOrder = async ({
  userId,
  products,
  address,
  orderNumber,
  subTotal,
  totalAmount,
  discount,
}) => {
  let orderStatus = [
    { label: "Pending", key: "Pending", status: true },
    { label: "In Progress", key: "In Progress", status: false },
    { label: "Shipped", key: "Shipped", status: false },
    { label: "Delivered", key: "Delivered", status: false },
  ];
  const order = new Order({
    userId,
    products,
    address,
    orderNumber,
    subTotal,
    totalAmount,
    discount,
    orderStatus,
  });
  await order.save();
  await sendSuccessOrderMail({
    userId,
    address,
    orderNumber,
    subTotal,
    discount,
    totalAmount,
  });
  return {
    status: true,
    msg: "Order created Successfully ",
  };
};
module.exports = { newOrder };
