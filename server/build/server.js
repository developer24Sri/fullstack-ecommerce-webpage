"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./routes/user");
const product_1 = require("./routes/product");
const app = (0, express_1.default)();
//Middlewares:
app.use((0, cors_1.default)()); // By setting up CORS correctly, your backend indicates to the browser that cross-origin requests from your frontend are safe, resolving the error and allowing your API calls to succeed.
app.use(express_1.default.json()); //every time data comes in an endpoint we wanted to be in the JSON format 
//Routes:
app.use("/auth", user_1.userRouter);
app.use("/products", product_1.productRouter);
//Database connection string:
mongoose_1.default.connect("mongodb+srv://vatsan24sri:ecom_password@ecomm.rkdm3.mongodb.net/ecomm");
app.listen(3001, () => console.log("Server started"));
