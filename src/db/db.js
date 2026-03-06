const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected successfully with Db");
  } catch (error) {
    console.log("error in connecting with Db", error);
  }
}

module.exports = connectDb;
