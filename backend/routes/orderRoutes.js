import express from 'express';
import Order from '../models/Order.js';


const router = express.Router();

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.headers['user-id'] || 'anonymous';
    const { page = 1, limit = 10, status } = req.query;

    const filter = { userId };
    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('items.product', 'name images');

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:orderId
// @access  Private
const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.id || req.headers['user-id'] || 'anonymous';

    const order = await Order.findOne({ orderId, userId })
      .populate('items.product', 'name images description');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { order }
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:orderId/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.id || req.headers['user-id'] || 'anonymous';

    const order = await Order.findOne({ orderId, userId });

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({
        status: 'error',
        message: 'Order cannot be cancelled'
      });
    }

    order.status = 'cancelled';
    await order.save();

    // Restore product stock if order was confirmed
    if (order.status === 'confirmed') {
      for (const item of order.items) {
        await require('../models/Product').findByIdAndUpdate(
          item.product,
          { $inc: { stock: item.quantity } }
        );
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to cancel order',
      error: error.message
    });
  }
};

// @desc    Get order statistics
// @route   GET /api/orders/stats
// @access  Private
const getOrderStats = async (req, res) => {
  try {
    const userId = req.user?.id || req.headers['user-id'] || 'anonymous';

    const stats = await Order.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);

    const statusCounts = await Order.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      totalOrders: stats[0]?.totalOrders || 0,
      totalSpent: stats[0]?.totalSpent || 0,
      averageOrderValue: stats[0]?.averageOrderValue || 0,
      statusBreakdown: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };

    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch order statistics',
      error: error.message
    });
  }
};

// Routes
router.get('/', getUserOrders);
router.get('/stats', getOrderStats);
router.get('/:orderId', getOrder);
router.put('/:orderId/cancel', cancelOrder);

export default router; 