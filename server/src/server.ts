import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {userRouter} from "./routes/userRoutes";
import { productRouter } from "./routes/productRoutes";

//Load env var's from .env file:
dotenv.config();

//App config:
const app = express();
const port  = process.env.PORT || 3001;

//Middlewares:
app.use(cors()); // By setting up CORS correctly, your backend indicates to the browser that cross-origin requests from your frontend are safe, resolving the error and allowing your API calls to succeed.
app.use(express.json()); //every time data comes in an endpoint we wanted to be in the JSON format 

//Routes:
app.use("/auth", userRouter);
app.use("/products", productRouter);


//Database connection string:
const databaseUrl = process.env.DATABASE_URL as string; 

mongoose.connect(databaseUrl)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));


// Start the server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));