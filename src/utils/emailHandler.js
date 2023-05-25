require("dotenv").config();
const { User } = require("../models/user");
var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: "msayxudemzmtgyxs",
  },
});
const attachments = [
  {
    filename: "logo.jpg",
    path: `${__dirname}/logo.jpg`,
    cid: "logo", //same cid value as in the html img src
  },
];
exports.sendSuccessOrderMail = async function ({
  userId,
  address,
  orderNumber,
  subTotal,
  discount,
  totalAmount,
}) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ _id: userId });
      var mailOptions = {
        from: process.env.email,
        to: user.email,
        attachments,
        subject: "Order Place Successfully!",
        html: `<div>
          <p>
            <img  src='cid:logo'/>
            </p>
          <p>
         <b>Dear ${
           user.name.charAt(0).toUpperCase() + user.name.slice(1)
         }  ;</b>
          </p>
          <p>
Thank you for your order!
<br/>
We have received your order, and we're getting it ready  and ship. 

Order Number: #${orderNumber} 
<br/>
Order Date: ${new Date().toISOString()} 
<br/>
Shipping Address:
${user.name + ", " + address}
<br/>
Sub Total: $${subTotal} 
<br/>
Discount: $${discount} 
<br/>
Total: $${totalAmount} 
<br/>
If you have any questions about your order, please reply to this email or contact us at <u>support@onlinestore.com</u>.
<br/>
Thanks again for your order. We hope you'll love your OnlineStore!
<br/><br/>
Sincerely,
<br/>
Team Online store
          </p>
          </div>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // console.log(error);
          reject(error);
        }
        // console.log(info);
        resolve(info);
      });
    } catch (error) {
      // console.log("Error sending mail:", error);
      reject(error);
    }
  });
};
