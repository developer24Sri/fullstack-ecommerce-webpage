import { Request, Response } from "express";
import { ProductErrors } from "../common/error";
import { getProductsFromCart, checkoutService, getPurchasedItemsService } from "../services/productServices";

// Controller to fetch all products
export const getAllProducts = async (_: Request, res: Response) => {
  const products = await getProductsFromCart();
  res.json({ products });
};

// Controller for checkout process
export const checkout = async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;
  try {
    const response = await checkoutService(customerID, cartItems);
    res.json(response);
  } catch (error) {
    if(error instanceof Error) {
    res.status(400).json({ type: error.message });
  } else {
    res.status(400).json({type: "Unknown Error"});
     }
   }
};

// Controller to get purchased items
export const getPurchasedItems = async (req: Request, res: Response) => {
  const { customerID } = req.params;
  try {
    const purchasedItems = await getPurchasedItemsService(customerID);
    res.json({ purchasedItems });
  } catch (error) {
    res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
  }
};
