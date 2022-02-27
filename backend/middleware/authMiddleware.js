import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from'../models/userModel.js'

const protect = asyncHandler( async (req,res,next)=> {
  const authHeader =req.headers.authorization

let token

  if(!authHeader ||!authHeader.startsWith('Bearer')) {
    
    res.status(401)
        throw new Error('Not authorized, no token')
 
}
    token = authHeader.split(' ')[1]

    try {
       
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
    console.error(error);
    res.status(401)
    throw new Error('Not authorized, token failed')
    }

 
})


const admin = (req,res,next) => {
  if(req.user&& req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }

  
}
export {protect,admin}