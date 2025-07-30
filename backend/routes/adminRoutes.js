import express from 'express';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAdminAllProducts,
} from '../controllers/admin.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();
// Routes
router.post(
  '/add-product',
  upload.fields([
    {
      name: 'productimages',
      maxCount: 1,
    },
  ]),
  addProduct
);

router.get('/get-products', getAdminAllProducts);

router.put(
  '/update-product/:id',
  upload.fields([{ name: 'productimages', maxCount: 1 }]),
  updateProduct
);

router.delete('/delete-product/:id', deleteProduct);

export default router;
