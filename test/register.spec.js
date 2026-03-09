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

  // should return status code for register
  it("test case for registration if user not register", async function () {
    this.timeout(0);
    const res = await request(app).post("/api/auth/register").send({
      userName: "hello",
      email: "adm,ijn@mail.com",
      password: "123456",
    });
    expect(res.status).to.be.equal(201);
  });

  it("test case for registration if user already register", async function () {
    this.timeout(0);
    const res = await request(app).post("/api/auth/register").send({
      userName: "hello",
      email: "admin@gmail.com",
      password: "123456",
    });
    expect(res.status).to.be.equal(409);
  });

  it("test case for registration if user not fill all the feilds", async function () {
    this.timeout(0);
    const res = await request(app).post("/api/auth/register").send({
      userName: "hello",
      email: "admin@mail.com",
    });
    expect(res.status).to.be.equal(404);
  });
});
