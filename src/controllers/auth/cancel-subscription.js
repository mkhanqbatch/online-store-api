import User from "../../models/user";

const CancelSubscription = async (id) => {
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
export default CancelSubscription;
