import express from 'express';
import { body } from 'express-validator';
import {
  addToCart,
  getCart,
  deleteFromCart,
  updateCart,
} from '../controllers/cartController.js';
import { authentication } from '../middleware/auth.js';


const router = express.Router();

router.post('/add-to-cart', authentication, addToCart);
router.get('/get-cart', authentication, getCart);
router.put('/update-cart', authentication, updateCart);
router.delete('/delete-from-cart', authentication, deleteFromCart);

// Export the router
export default router;