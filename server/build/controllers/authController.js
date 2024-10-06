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
exports.getAvailableMoney = exports.loginUser = exports.registerUser = void 0;
const authServices_1 = require("../services/authServices");
const error_1 = require("../common/error");
// Controller for registering a user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield (0, authServices_1.register)(username, password);
        if (result === error_1.UserErrors.USERNAME_ALREADY_EXISTS) {
            return res.status(400).json({ type: result });
        }
        res.json({ message: "User Registered Successfully" });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.registerUser = registerUser;
// Controller for user login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const { token, userID, error } = yield (0, authServices_1.login)(username, password);
        if (error) {
            return res.status(400).json({ type: error });
        }
        res.json({ token, userID });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.loginUser = loginUser;
// Controller for fetching available money
const getAvailableMoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    try {
        const availableMoney = yield (0, authServices_1.fetchAvailableMoney)(userID);
        if (!availableMoney) {
            return res.status(400).json({ type: error_1.UserErrors.NO_USER_FOUND });
        }
        res.json({ availableMoney });
    }
    catch (err) {
        res.status(500).json({ type: err });
    }
});
exports.getAvailableMoney = getAvailableMoney;
