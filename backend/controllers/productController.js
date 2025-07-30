import Product from '../models/Product.js';
import { validationResult } from 'express-validator';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    // Get query params for pagination and sorting
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 products per page
    const skip = (page - 1) * limit;

    const sortBy = req.query.sort || 'createdAt'; // default sort field
    const sortOrder = req.query.order === 'desc' ? -1 : 1; // default ascending

    // Fetch total count (for pagination metadata)
    const total = await Product.countDocuments();

    // Fetch products with pagination, sort, and populate
    const products = await Product.find()
      .populate('category', 'name')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: 'success',
      total, // total products in DB
      page, // current page
      limit, // products per page
      totalPages: Math.ceil(total / limit),
      count: products.length, // products returned in this page
      data: { products },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'category',
      'name'
    );

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { product },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)

export {
  getAllProducts,
  getProduct,
};
