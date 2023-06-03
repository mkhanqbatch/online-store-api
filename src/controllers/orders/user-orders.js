import Order from "../../models/order";

const UserOrders = async (userId) => {
  const orders = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $match: {
        userId: userId,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "products.asin",
        foreignField: "asin",
        as: "ProductInfo",
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$ProductInfo",
    },
    { $unwind: "$userDetails" },
    {
      $group: {
        _id: "$_id",
        orderNumber: { $first: "$orderNumber" },
        address: { $first: "$address" },
        userName: { $first: "$userDetails.name" },
        status: { $first: "$status" },
        amount: { $first: "$totalAmount" },
        products: {
          $push: {
            asin: "$ProductInfo.asin",
            sellerId: "$ProductInfo.sellerId",
            name: "$ProductInfo.name",
          },
        },
      },
    },
  ]);

  return orders;
};
export default UserOrders;
