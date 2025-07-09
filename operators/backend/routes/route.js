const express = require("express");
const router = express.Router();
const { getdata } = require("../controllers/controllers");

router.get("/getdata", getdata);

module.exports = router;
