"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPurchasedItemsService = exports.checkoutService = exports.getProductsFromCart = void 0;
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const error_1 = require("../common/error");
// Service to fetch all products from the database
const getProductsFromCart = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_1.ProductModel.find({});
});
exports.getProductsFromCart = getProductsFromCart;
// Service to handle the checkout logic
const checkoutService = (customerID, cartItems) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findById(customerID);
    const productIDs = Object.keys(cartItems);
    const products = yield product_1.ProductModel.find({ _id: { $in: productIDs } });
    if (!user) {
        throw new Error(error_1.ProductErrors.NO_USERS_FOUND);
    }
    if (products.length !== productIDs.length) {
        throw new Error(error_1.ProductErrors.NO_PRODUCT_FOUND);
    }
    let totalPrice = 0;
    for (const item in cartItems) {
        const product = products.find((product) => String(product._id) === item);
        if (!product) {
            throw new Error(error_1.ProductErrors.NO_PRODUCT_FOUND);
        }
        if (product.stockQuantity < cartItems[item]) {
            throw new Error(error_1.ProductErrors.NOT_ENOUGH_STOCK);
        }
        totalPrice += product.price * cartItems[item];
    }
    if (user.availableMoney < totalPrice) {
        throw new Error(error_1.ProductErrors.NO_AVAILABLE_MONEY);
    }
    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);
    yield user.save();
    yield product_1.ProductModel.updateMany({ _id: { $in: productIDs } }, { $inc: { stockQuantity: -1 } });
    return { purchasedItems: user.purchasedItems };
});
exports.checkoutService = checkoutService;
// Service to fetch purchased items of a user
const getPurchasedItemsService = (customerID) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findById(customerID);
    if (!user) {
        throw new Error(error_1.ProductErrors.NO_USERS_FOUND);
    }
    const products = yield product_1.ProductModel.find({
        _id: { $in: user.purchasedItems },
    });
    return products;
});
exports.getPurchasedItemsService = getPurchasedItemsService;
