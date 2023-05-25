const { Order } = require("../../models/order");

const sellerOrders = async (sellerId) => {
  const orders = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $match: {
        "products.sellerId": sellerId,
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
      $addFields: {
        userIdObj: { $toObjectId: "$userId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userIdObj",
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
        orderStatus: { $first: "$orderStatus" },
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
module.exports = { sellerOrders };
