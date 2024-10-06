import { Router } from "express";
import { getAllProducts, checkout, getPurchasedItems } from "../controllers/productController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getAllProducts);
router.post("/checkout", verifyToken, checkout);
router.get("/purchased-items/:customerID", verifyToken, getPurchasedItems);

export { router as productRouter };
