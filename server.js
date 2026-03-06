require("dotenv").config();
const express = require("express");
const app = require("./src/app");
const connectDb = require("./src/db/db");

connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error");
  });
