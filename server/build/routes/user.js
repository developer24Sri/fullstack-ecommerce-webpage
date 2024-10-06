"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
exports.userRouter = router;
// Route for user registration
router.post("/register", authController_1.registerUser);
// Route for user login
router.post("/login", authController_1.loginUser);
// Route for fetching available money
router.get("/available-money/:userID", authMiddleware_1.verifyToken, authController_1.getAvailableMoney);
