import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"
export const getAllProducts = asyncHandler( async (req,res) => {
   const products =await Product.find({})
   res.status(200).json(products)
})

export const getSingleProduct = asyncHandler( async (req,res) => {
    const product =await Product.findById(req.params.id)
  
    if(!product) {
        res.status(404)
        throw new Error('Product not found')
    }
    res.status(200).json(product)
 })

 