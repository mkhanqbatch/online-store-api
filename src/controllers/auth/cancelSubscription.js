const { User } = require("../../models/user");
require("dotenv").config();

const cancelSubscription = async (id) => {
  await User.updateOne(
    {
      subscriptionId: id,
    },
    {
      $unset: {
        subscriptionId: 1,
      },
    }
  );
  return { msg: "Subscription is cancelled." };
};
module.exports = { cancelSubscription };
