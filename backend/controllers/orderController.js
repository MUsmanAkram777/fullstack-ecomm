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
          console.log(order)
          res.status(200).json(order);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
  }
});
