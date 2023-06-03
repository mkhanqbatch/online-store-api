import Order from "../../models/order";
import sendSuccessOrderMail from "../../utils/emailHandler";
import { Types } from "mongoose";
const NewOrder = async ({
  userId,
  products,
  address,
  orderNumber,
  subTotal,
  totalAmount,
  discount,
}) => {
  const order = new Order({
    _id: new Types.ObjectId().toHexString(),
    userId,
    products,
    address,
    orderNumber,
    subTotal,
    totalAmount,
    discount,
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
export default NewOrder;
