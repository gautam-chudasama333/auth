const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function isTokenPresent(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({
        message: "User not exist",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(409).json({
      message: "Invalid Token",
    });
  }
}

async function loginWithToken(req, res, next) {
  const token = req.cookies.token;

  if (req.body !== undefined) {
    return next();
  }

  if (!token || token == undefined) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({
        message: "User not exist",
      });
    }

    return res.status(200).json({
      message: "Login Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

async function isAdmin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({
        message: "User not exist",
      });
    }

    if (!user.isAdmin) {
      return res.status(409).json({
        message: "Your are not an Admin",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(409).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { isTokenPresent, loginWithToken, isAdmin };
