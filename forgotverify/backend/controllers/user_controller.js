const usermodel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utilities/config");
const { Sendmail } = require("../utilities/nodemailer");


const newuser = async (req, res) => {
  try {
    const user = req.body;
    if (!user) {
      return res
        .status(404)
        .json({ status: false, data: { message: "All fields are mandatory" } });
    }

    const hashpassword = bcrypt.hashSync(user.password, 10);

    const dbuser = new usermodel({
      name: user.name,
      email: user.email,
      password: hashpassword,
    });

    await dbuser.save();

    const token = jwt.sign({ id: dbuser._id }, JWT_SECRET, { expiresIn: "1d" });
    const link = `http://localhost:5000/api/verify/${token}`;

    await Sendmail(
      dbuser.email,
      "Verify Your Email",
      `Dear ${dbuser.name},<br><a href="${link}">Click here to verify your email</a>`,
      `Verify your email using this link: ${link}`
    );

    return res
      .status(200)
      .json({
        status: true,
        data: { message: "User created successfully.", data: dbuser },
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        data: { message: "Internal server error", data: error },
      });
  }
};


const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await usermodel.findById(decoded.id);
    if (!user) {
      return res.status(404).send("Invalid verification link.");
    }

    if (user.isVerified) {
      return res.status(200).send("Email already verified.");
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).send("Email verified successfully.");
  } catch (error) {
    console.log(error);
    return res.status(400).send(" Invalid or expired verification link.");
  }
};

const userget = async (req, res) => {
  try {
    const ali = await usermodel.find();
    return res
      .status(200)
      .json({
        status: true,
        data: { message: "All data received", data: ali },
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        data: { message: "Internal server error", data: error },
      });
  }
};

const edituser = async (req, res) => {
  try {
    const userid = req.params.id;
    const user = req.body;

    if (!userid && user) {
      return res
        .status(404)
        .json({
          status: false,
          data: { message: "User ID and user is not null." },
        });
    }

    const dbuser = await usermodel.updateOne(
      { _id: userid },
      {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    );

    return res
      .status(200)
      .json({ status: true, data: { message: "Updated successfully" } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        data: { message: "Internal server error", data: error },
      });
  }
};

const deleteuser = async (req, res) => {
  try {
    const userid = req.params.id;
    await usermodel.deleteOne({ _id: userid });
    return res
      .status(200)
      .json({ status: true, data: { message: "Deleted successfully" } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        data: { message: "Internal server error", data: error },
      });
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const dbuser = await usermodel.findOne({ email: user.email });

    if (!dbuser) {
      return res
        .status(404)
        .json({ status: false, data: { message: "Email not found" } });
    }

    if (!dbuser.isVerified) {
      return res
        .status(403)
        .json({
          status: false,
          data: { message: "Please verify your email before logging in." },
        });
    }

    if (bcrypt.compareSync(user.password, dbuser.password)) {
      const token = jwt.sign({ id: dbuser._id }, JWT_SECRET);
      dbuser.password = undefined;

      return res.status(200).json({
        status: true,
        data: {
          message: "Login successfully",
          data: dbuser,
          token: token,
        },
      });
    } else {
      return res
        .status(404)
        .json({ status: false, data: { message: "Incorrect password" } });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      data: { message: "Internal server error", data: error },
    });
  }
};

const Authverify = (req, res) => {
  return res
    .status(200)
    .json({ status: true, data: { message: "Auth Success", data: req.ray } });
};

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "Email not found" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    const url = `http://localhost:5000/api/reset-password/${token}`;

    await Sendmail(
      user.email,
      "Reset Your Password",
      `Click <a href="${url}">here</a> to reset your password.`,
      `Reset link: ${url}`
    );

    return res
      .status(200)
      .json({ status: true, message: "Reset email sent successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Server error", error });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await usermodel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ status: true, message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ status: false, message: "Invalid password", error });
  }
};



module.exports = {
  newuser,
  userget,
  edituser,
  deleteuser,
  login,
  Authverify,
  verifyEmail,
  forgotpassword,
  resetpassword,
};
