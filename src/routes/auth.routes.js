const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", authController.registerUser);

router.get("/user", authMiddleware.isTokenPresent, authController.getUser);

router.post("/login", authMiddleware.loginWithToken, authController.loginUser);

module.exports = router;
