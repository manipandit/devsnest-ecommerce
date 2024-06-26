
var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject: string, toEmail: string, otpText: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error: any, info:any) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}