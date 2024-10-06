import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { ProductErrors } from "../common/error";

// Service to fetch all products from the database
export const getProductsFromCart = async () => {
  return await ProductModel.find({});
};

// Service to handle the checkout logic
export const checkoutService = async (customerID: string, cartItems: any) => {
  const user = await UserModel.findById(customerID);
  const productIDs = Object.keys(cartItems);
  const products = await ProductModel.find({ _id: { $in: productIDs } });

  if (!user) {
    throw new Error(ProductErrors.NO_USERS_FOUND);
  }
  if (products.length !== productIDs.length) {
    throw new Error(ProductErrors.NO_PRODUCT_FOUND);
  }

  let totalPrice = 0;
  for (const item in cartItems) {
    const product = products.find((product) => String(product._id) === item);
    if (!product) {
      throw new Error(ProductErrors.NO_PRODUCT_FOUND);
    }
    if (product.stockQuantity < cartItems[item]) {
      throw new Error(ProductErrors.NOT_ENOUGH_STOCK);
    }
    totalPrice += product.price * cartItems[item];
  }

  if (user.availableMoney < totalPrice) {
    throw new Error(ProductErrors.NO_AVAILABLE_MONEY);
  }

  user.availableMoney -= totalPrice;
  user.purchasedItems.push(...productIDs);

  await user.save();
  await ProductModel.updateMany(
    { _id: { $in: productIDs } },
    { $inc: { stockQuantity: -1 } }
  );

  return { purchasedItems: user.purchasedItems };
};

// Service to fetch purchased items of a user
export const getPurchasedItemsService = async (customerID: string) => {
  const user = await UserModel.findById(customerID);
  if (!user) {
    throw new Error(ProductErrors.NO_USERS_FOUND);
  }

  const products = await ProductModel.find({
    _id: { $in: user.purchasedItems },
  });

  return products;
};
