import express from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProduct,
} from '../controllers/productController.js';


const router = express.Router();

// Routes
router.get('/all-products', getAllProducts);
router.get('/detail-product/:id', getProduct);

// Validation middleware for product creation and updates can be added here

export default router;