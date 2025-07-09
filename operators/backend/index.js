const express = require("express");
const cors = require("cors");
const productrouter = require("./routes/route");
const app = express();
const conn = require("./utilities/connectdb");
app.use(cors());

app.use(express.json());

app.use("/api", productrouter);

const startserver = async () => {
  try {
    await conn();
    app.listen(5000, () => {
      console.log("server is running on the port 5000");
    });
  } catch (error) {
    console.log("failed to start server");
    process.exit(1);
  }
};

startserver();
