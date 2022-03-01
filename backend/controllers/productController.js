import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 2

  const  {keyword,pageNumber } = req.query 

  const queryObject = {}

  if(keyword) {
    queryObject.name ={ $regex: keyword, $options: 'i' };
      
  } 

  const page = Number(pageNumber) || 1

  const count = await Product.countDocuments(queryObject)

  const products = await Product.find(queryObject)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

    

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

  const product = await Product.FindById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  product.name = name;
  product.price = price;
  product.image = image;
  product.brand = brand;
  product.category = brand;
  product.countInstock = category;
  product.description = description;

  const updateProduct = await product.save();
  res.status(201).json(updateProduct);
});

export const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  const hasReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (hasReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((total, item) => item.rating + total, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json(product);
});
