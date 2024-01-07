import express from "express";
import dotenv from "dotenv";
// importing routes
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
// importing custom built middlewares
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// created an app with express framework
const app = express();
// configure dotenv so we can access the environment variables anywhere in the project
dotenv.config();
// to make request from the frontend
app.use(cors({ origin: "http://localhost:5173" }));
// to convert the parse JSON data from te req.body
app.use(express.json());
// to parse the cookies from the request
app.use(cookieParser());
// setting up the routes
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRouter);
// error middleware for handling controller errors
app.use(errorHandler);
// export the app variable so we can run the server inside the server.js
export default app;
