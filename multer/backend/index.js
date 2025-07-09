const express = require("express");
const cors = require("cors");
// const conn = require("./utils/connectdb");
const upload = require("./utils/uploads");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/upload", upload.array("image"), (req, res) => {
  console.log(req.files);
  const filename = req.files.map((file) => file.filename);
  return res
    .status(200)
    .json({
      status: true,
      data: { message: "image uploading successfully.", data: filename },
    });
});

const startserver = async () => {
  try {
    // await conn();

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.log("failed to start server");
    process.exit(1);
  }
};

startserver();
