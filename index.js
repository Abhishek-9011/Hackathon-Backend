// app.js
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { hospitalRouter } = require("./routes/hospital"); // Import the hospital router
const cors = require('cors');

const app = express();
require("dotenv").config();

let MONGO_URL = process.env.MONGO_DB_URL;
app.use(cors());

app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/hospital", hospitalRouter); // Use the hospital router here

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
