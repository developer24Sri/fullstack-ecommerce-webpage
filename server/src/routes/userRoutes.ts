import { Router } from "express";
import { registerUser, loginUser, getAvailableMoney } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route for fetching available money
router.get("/available-money/:userID", verifyToken, getAvailableMoney);

export { router as userRouter };
