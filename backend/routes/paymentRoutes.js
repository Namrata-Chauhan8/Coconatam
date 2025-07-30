// import express from "express";
// import { body } from "express-validator";
// import {
//   createOrder,
//   verifyPayment,
//   getPaymentStatus,
//   createRefund,
// } from "../controllers/paymentController.js";

// const router = express.Router();

// // Validation middleware
// const validateCreateOrder = [
//   body("cartId").isMongoId().withMessage("Valid cart ID is required"),
//   body("shippingAddress.name")
//     .trim()
//     .notEmpty()
//     .withMessage("Shipping name is required"),
//   body("shippingAddress.phone")
//     .trim()
//     .notEmpty()
//     .withMessage("Shipping phone is required"),
//   body("shippingAddress.address")
//     .trim()
//     .notEmpty()
//     .withMessage("Shipping address is required"),
//   body("shippingAddress.city")
//     .trim()
//     .notEmpty()
//     .withMessage("Shipping city is required"),
//   body("shippingAddress.state")
//     .trim()
//     .notEmpty()
//     .withMessage("Shipping state is required"),
//   body("shippingAddress.pincode")
//     .trim()
//     .notEmpty()
//     .withMessage("Shipping pincode is required"),
// ];

// const validateVerifyPayment = [
//   body("razorpay_order_id")
//     .notEmpty()
//     .withMessage("Razorpay order ID is required"),
//   body("razorpay_payment_id")
//     .notEmpty()
//     .withMessage("Razorpay payment ID is required"),
//   body("razorpay_signature")
//     .notEmpty()
//     .withMessage("Razorpay signature is required"),
//   body("orderId").notEmpty().withMessage("Order ID is required"),
// ];

// const validateRefund = [
//   body("orderId").notEmpty().withMessage("Order ID is required"),
//   body("amount")
//     .isFloat({ min: 0 })
//     .withMessage("Refund amount must be a positive number"),
//   body("reason")
//     .optional()
//     .trim()
//     .notEmpty()
//     .withMessage("Refund reason cannot be empty if provided"),
// ];

// // Routes
// router.post("/create-order", validateCreateOrder, createOrder);
// router.post("/verify", validateVerifyPayment, verifyPayment);
// router.get("/status/:orderId", getPaymentStatus);
// router.post("/refund", validateRefund, createRefund);

// export default router;