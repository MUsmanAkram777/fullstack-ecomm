import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// add order to database
export const addOrder = asyncHandler(async (req, res, next) => {
  console.log("order called");
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    shippingPrice,
    paymentMethod,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(401);
    throw new Error("No order items to place the order");
  } else {
    try {
        const order = await Order.create({
            orderItems,
            user: req.user._id,
            shippingAddress,
            totalPrice,
            shippingPrice,
            paymentMethod,
          }); 
          res.status(200).json(order);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
  }
});



// get order to database
export const getOrderById = asyncHandler(async (req, res, next) => {
  console.log('get order called')
  const orderID = req.params.id
  if(orderID){
    const order = await Order.findById(orderID).populate('user', 'name email')
    if(order){
      res.status(200).json(order)
    }else{
      res.status(404)
      throw new Error('Order not found')
    }
  }else{
    res.status(404)
    throw new Error('Order ID is missing')
  }
});



// get order to database
export const getAllOrderByUser = asyncHandler(async (req, res, next) => {
  const userID = req.user._id
  if(userID){
    const allOrder = await Order.find({user:userID})
    if(allOrder){
      res.status(200).json(allOrder)
    }else{
      res.status(404)
      throw new Error('Orders not found')
    }
  }else{
    res.status(404)
    throw new Error('User ID is missing')
  }
});