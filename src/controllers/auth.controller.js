const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(404).json({
      message: "all feilds are compolsory",
    });
  }

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({
      message: "User already exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({ userName, email, password: hash });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    user,
  });
}

async function getUser(req, res) {
  let user = req.user;

  return res.status(200).json({
    message: "Fetch successfully",
    user,
  });
}

async function loginUser(req, res) {
  if (req.body == undefined) {
    return res.status(404).json({
      message: "Please enter email or password",
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      message: "Please enter email or password",
    });
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not exist",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    // res.clearCookie("token");

    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login Successfully",
    user,
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const del = await userModel.deleteOne({ _id: id });

  if (!del.deletedCount >= 1) {
    return res.status(200).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "Deleted successfully",
  });
}

module.exports = { registerUser, getUser, loginUser, deleteUser };
