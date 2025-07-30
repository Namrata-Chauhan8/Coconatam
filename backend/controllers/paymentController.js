// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import Product from "../models/Product.js";

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // @desc    Create Razorpay order
// // @route   POST /api/payments/create-order
// // @access  Private
// const createOrder = async (req, res) => {
//   try {
//     const { cartId, shippingAddress } = req.body;
//     const userId = req.user?.id || req.headers["user-id"] || "anonymous";

//     // Get cart details
//     const cart = await Cart.findById(cartId).populate("items.product");

//     if (!cart || cart.userId !== userId) {
//       return res.status(404).json({
//         status: "error",
//         message: "Cart not found",
//       });
//     }

//     if (cart.items.length === 0) {
//       return res.status(400).json({
//         status: "error",
//         message: "Cart is empty",
//       });
//     }

//     // Validate stock availability
//     for (const item of cart.items) {
//       const product = await Product.findById(item.product._id);
//       if (!product || product.stock < item.quantity) {
//         return res.status(400).json({
//           status: "error",
//           message: `Insufficient stock for ${product?.name || "product"}`,
//         });
//       }
//     }

//     // Calculate totals
//     const subtotal = cart.items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     const tax = subtotal * 0.18; // 18% GST
//     const shipping = subtotal > 1000 ? 0 : 100; // Free shipping above ₹1000
//     const total = subtotal + tax + shipping;

//     // Create order in database
//     const order = await Order.create({
//       orderId: Order.generateOrderId(),
//       userId,
//       items: cart.items.map((item) => ({
//         product: item.product._id,
//         name: item.product.name,
//         quantity: item.quantity,
//         price: item.price,
//         currency: item.currency,
//       })),
//       subtotal,
//       tax,
//       shipping,
//       total,
//       currency: "INR",
//       paymentMethod: "razorpay",
//       shippingAddress,
//     });

//     // Create Razorpay order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: Math.round(total * 100), // Convert to paise
//       currency: "INR",
//       receipt: order.orderId,
//       notes: {
//         orderId: order.orderId,
//         userId: userId,
//       },
//     });

//     // Update order with Razorpay order ID
//     order.razorpayOrderId = razorpayOrder.id;
//     await order.save();

//     res.status(200).json({
//       status: "success",
//       message: "Order created successfully",
//       data: {
//         order: {
//           id: order._id,
//           orderId: order.orderId,
//           total: order.total,
//           currency: order.currency,
//         },
//         razorpayOrder: {
//           id: razorpayOrder.id,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to create order",
//       error: error.message,
//     });
//   }
// };

// // @desc    Verify payment signature
// // @route   POST /api/payments/verify
// // @access  Private
// const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;

//     // Verify signature
//     const text = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(text)
//       .digest("hex");

//     if (signature !== razorpay_signature) {
//       return res.status(400).json({
//         status: "error",
//         message: "Invalid payment signature",
//       });
//     }

//     // Find and update order
//     const order = await Order.findOne({ orderId });

//     if (!order) {
//       return res.status(404).json({
//         status: "error",
//         message: "Order not found",
//       });
//     }

//     // Update order status
//     order.status = "confirmed";
//     order.paymentStatus = "paid";
//     order.razorpayPaymentId = razorpay_payment_id;
//     await order.save();

//     // Update product stock
//     for (const item of order.items) {
//       await Product.findByIdAndUpdate(item.product, {
//         $inc: { stock: -item.quantity },
//       });
//     }

//     // Clear cart
//     const cart = await Cart.findOne({ userId: order.userId, isActive: true });
//     if (cart) {
//       await cart.clearCart();
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Payment verified successfully",
//       data: { order },
//     });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to verify payment",
//       error: error.message,
//     });
//   }
// };

// // @desc    Get payment status
// // @route   GET /api/payments/status/:orderId
// // @access  Private
// const getPaymentStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const userId = req.user?.id || req.headers["user-id"] || "anonymous";

//     const order = await Order.findOne({ orderId, userId });

//     if (!order) {
//       return res.status(404).json({
//         status: "error",
//         message: "Order not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         orderId: order.orderId,
//         status: order.status,
//         paymentStatus: order.paymentStatus,
//         total: order.total,
//         currency: order.currency,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching payment status:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to fetch payment status",
//       error: error.message,
//     });
//   }
// };

// // @desc    Create refund
// // @route   POST /api/payments/refund
// // @access  Private (Admin)
// const createRefund = async (req, res) => {
//   try {
//     const { orderId, amount, reason } = req.body;

//     const order = await Order.findOne({ orderId });

//     if (!order) {
//       return res.status(404).json({
//         status: "error",
//         message: "Order not found",
//       });
//     }

//     if (order.paymentStatus !== "paid") {
//       return res.status(400).json({
//         status: "error",
//         message: "Order is not paid",
//       });
//     }

//     if (!order.razorpayPaymentId) {
//       return res.status(400).json({
//         status: "error",
//         message: "No payment ID found",
//       });
//     }

//     // Create refund through Razorpay
//     const refund = await razorpay.payments.refund(order.razorpayPaymentId, {
//       amount: Math.round(amount * 100), // Convert to paise
//       notes: {
//         reason: reason || "Customer request",
//       },
//     });

//     // Update order status
//     order.paymentStatus = "refunded";
//     order.status = "cancelled";
//     await order.save();

//     // Restore product stock
//     for (const item of order.items) {
//       await Product.findByIdAndUpdate(item.product, {
//         $inc: { stock: item.quantity },
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Refund processed successfully",
//       data: { refund },
//     });
//   } catch (error) {
//     console.error("Error creating refund:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Failed to process refund",
//       error: error.message,
//     });
//   }
// };

// export {
//   createOrder,
//   verifyPayment,
//   getPaymentStatus,
//   createRefund,
// };