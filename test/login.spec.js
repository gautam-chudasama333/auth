require("dotenv").config();
const request = require("supertest");
const app = require("../src/app.js");
const mongoose = require("mongoose");
const { expect } = require("chai");

describe("check status code", () => {
  before(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  // should return status code for login
  it("test case for login if user forgot to fill the details", async function () {
    this.timeout(0);
    const res = await request(app).post("/api/auth/login").send({
      password: "123456",
    });
    expect(res.status).to.be.equal(404);
  });

  it("should return status code for login", async function () {
    this.timeout(0);
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@g.com",
      password: "123456",
    });
    expect(res.status).to.be.equal(404);
  });

  it("test case for login if user password is wroung", async function () {
    this.timeout(0);
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@mail.com",
      password: "1234567",
    });
    expect(res.status).to.be.equal(401);
  });

  it("test case for login if user successfully loged-in", async function () {
    this.timeout(0);
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@mail.com",
      password: "123456",
    });
    expect(res.status).to.be.equal(200);
  });
});
