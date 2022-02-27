import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRouter.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import 'express-async-errors'
dotenv.config();
connectDB();
const app = express();
app.use(express.json())
app.get("/", (req, res) => {
  res.send("API is running....");
});


app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

app.get('/api/v1/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID) )
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in on port ${PORT}`
  )
);
