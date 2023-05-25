const { signIn } = require("../auth/login");
const { signUp } = require("../auth/signup");
const { setSubscription } = require("./setSubscription");
const { cancelSubscription } = require("./cancelSubscription");
const auth = { signIn, signUp, setSubscription, cancelSubscription };
module.exports = auth;
