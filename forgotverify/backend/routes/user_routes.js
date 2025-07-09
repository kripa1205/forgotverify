const express = require("express");
const {
  newuser,
  userget,
  edituser,
  deleteuser,
  login,
  Authverify,
  verifyEmail,
  forgotpassword,
  resetpassword,
} = require("../controllers/user_controller");
const Auth = require("../middleware/auth");
const router = express.Router();

router.post("/newuser", newuser);
router.get("/getuser", userget);
router.put("/edituser/:id", edituser);
router.delete("/deleteuser/:id", deleteuser);
router.post("/login", login);
router.post("/authverify", Auth, Authverify);
router.get("/verify/:token", verifyEmail); 
router.post("/request-reset",forgotpassword ); 
router.post("/reset-password/:token", resetpassword);


module.exports = router;
