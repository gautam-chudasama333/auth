const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// user routes
router.post("/register", authController.registerUser);

router.get("/user", authMiddleware.isTokenPresent, authController.getUser);

router.post("/login", authMiddleware.loginWithToken, authController.loginUser);

// admin routes
router.delete(
  "/admin/delete/:id",
  authMiddleware.isAdmin,
  authController.deleteUser,
);

module.exports = router;
