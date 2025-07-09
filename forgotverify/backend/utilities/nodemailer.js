const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("./config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.log("Email server error:", error);
  } else {
    console.log(" Email server is ready");
  }
});

const Sendmail = async (to, subject, html, text = "") => {
  const mail = {
    from: EMAIL,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mail);
    console.log(" Mail sent to", to);
  } catch (error) {
    console.log(" Mail sending failed:", error);
    throw error;
  }
};

module.exports = { Sendmail };
gt5