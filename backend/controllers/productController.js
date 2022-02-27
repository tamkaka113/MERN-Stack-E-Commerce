import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.remove();
  res.json({ message: "Product removed" });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "Sample brand ",
    category: "Sample category ",
    countInstock: 0,
    numReviews: 0,
    description: "Sample description ",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, countInstock, description } =
    req.body;

    const product =await Product.FindById(req.params.id)
    if(!product) {
        res.status(404)
        throw new Error("Product Not Found")
    }

    product.name =name
    product.price =name
    product.image =name
    product.brand =name
    product.category =name
    product.countInstock =name
    product.description =description

  const updateProduct = await product.save();
  res.status(201).json(updateProduct);
});
