const { JWT_SECRET } = require("../utilities/config");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user_model");
const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, JWT_SECRET);

    const dbuser = await usermodel
      .findById({ _id: user.id })
      .select("-password");

    req.ray = dbuser;
    next();
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

module.exports = Auth;
