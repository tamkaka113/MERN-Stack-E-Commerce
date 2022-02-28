import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    Shipping,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    Shipping,
    totalPrice,
  });

  const createOrder = await order.save();

  res.status(201).json(createOrder);
});
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.payer.email_address,
  };
  const updateOrder = await order.save();

  res.json(updateOrder);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updateOrder = await order.save();

  res.json(updateOrder);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user:req.user._id});
  res.status(200).json(orders)

  res.json(updateOrder);
});


const getOrderList = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name email');
  res.status(200).json(orders)

  res.json(updateOrder);
});

export { addOrderItems, getOrderById, updateOrderToPaid,getUserOrders,getOrderList,updateOrderToDelivered };
