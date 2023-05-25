require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const createSubscription = async ({ priceId, email, name, paymentMethod }) => {
  // create a stripe customer or retrieve old one
  const customer = await findOrCreateCustomer(email, name, paymentMethod);

  // create a stripe subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_settings: {
      payment_method_options: {
        card: {
          request_three_d_secure: "any",
        },
      },
      payment_method_types: ["card"],
      save_default_payment_method: "on_subscription",
    },
    expand: ["latest_invoice.payment_intent"],
  });

  // return the client secret and subscription id
  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    subscriptionId: subscription.id,
  };
};
async function findOrCreateCustomer(email, name, paymentMethod) {
  const customerList = await stripe.customers.list({ email });
  if (customerList.data.length > 0) {
    return customerList.data[0];
  } else {
    const newCustomer = await stripe.customers.create({
      name: name,
      email: email,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });
    return newCustomer;
  }
}
module.exports = { createSubscription };
