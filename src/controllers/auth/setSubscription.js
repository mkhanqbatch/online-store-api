const { User } = require("../../models/user");

const setSubscription = async ({ userId, subscriptionId }) => {
  const user = await User.updateOne({ _id: userId }, { subscriptionId });

  return { msg: "subscription is created." };
};
module.exports = { setSubscription };
