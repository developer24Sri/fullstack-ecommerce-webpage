"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};
exports.verifyToken = verifyToken;
