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
exports.getPurchasedItems = exports.checkout = exports.getAllProducts = void 0;
const error_1 = require("../common/error");
const productServices_1 = require("../services/productServices");
// Controller to fetch all products
const getAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, productServices_1.getProductsFromCart)();
    res.json({ products });
});
exports.getAllProducts = getAllProducts;
// Controller for checkout process
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerID, cartItems } = req.body;
    try {
        const response = yield (0, productServices_1.checkoutService)(customerID, cartItems);
        res.json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ type: error.message });
        }
        else {
            res.status(400).json({ type: "Unknown Error" });
        }
    }
});
exports.checkout = checkout;
// Controller to get purchased items
const getPurchasedItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerID } = req.params;
    try {
        const purchasedItems = yield (0, productServices_1.getPurchasedItemsService)(customerID);
        res.json({ purchasedItems });
    }
    catch (error) {
        res.status(400).json({ type: error_1.ProductErrors.NO_USERS_FOUND });
    }
});
exports.getPurchasedItems = getPurchasedItems;
