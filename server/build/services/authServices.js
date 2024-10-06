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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAvailableMoney = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const error_1 = require("../common/error");
// Service for registering a user
const register = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.UserModel.findOne({ username });
    if (existingUser) {
        return error_1.UserErrors.USERNAME_ALREADY_EXISTS;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new user_1.UserModel({ username, password: hashedPassword });
    yield newUser.save();
    return null; // Success
});
exports.register = register;
// Service for logging in a user
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findOne({ username });
    if (!user) {
        return { error: error_1.UserErrors.NO_USER_FOUND };
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return { error: error_1.UserErrors.WRONG_CREDENTIALS };
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, "secret");
    return { token, userID: user._id };
});
exports.login = login;
// Service for fetching user's available money
const fetchAvailableMoney = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findById(userID);
    return user ? user.availableMoney : null;
});
exports.fetchAvailableMoney = fetchAvailableMoney;
