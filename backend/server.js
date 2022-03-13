import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRouter.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import 'express-async-errors'
import path from 'path'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import {v2 as cloudinary}  from 'cloudinary';

dotenv.config();

connectDB();
const app = express();
app.use(fileUpload({ useTempFiles: true }))
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET,

})
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname,'./frontend/build')))

app.use(morgan('dev'))
app.use(express.json())


app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

app.get('/api/v1/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID) )
app.use(notFound)
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))

  app.get('/*', (req, res) =>
    res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in on port ${PORT}`
  )
);
