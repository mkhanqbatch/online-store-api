import User from "../../models/user";

const SetSubscription = async ({ userId, subscriptionId }) => {
  console.log("user id and subscription id ", userId, subscriptionId);
  const user = await User.updateOne({ _id: userId }, { subscriptionId });
  return { msg: "subscription is created." };
};
export default SetSubscription;
