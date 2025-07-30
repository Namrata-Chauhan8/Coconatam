import  Cart  from '../models/Cart.js';
import Product from '../models/Product.js';


const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // make sure req.user is populated via auth middleware

    if (!productId || !quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Product ID and quantity are required',
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already in cart
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();

    return res.status(200).json({
      status: 'success',
      message: 'Product added/updated in cart',
      data: cart,
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while adding to cart',
      error: error.message,
    });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // make sure req.user is populated via auth middleware
    const cart = await Cart.findOne({ userId }).populate('items.product');
    return res.status(200).json({
      status: 'success',
      message: 'Cart retrieved successfully',
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while retrieving cart',
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // make sure req.user is populated via auth middleware

    if (!productId || !quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Product ID and quantity are required',
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found in cart',
      });
    }

    item.quantity = quantity;
    await cart.save();

    return res.status(200).json({
      status: 'success',
      message: 'Cart updated successfully',
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating cart',
      error: error.message,
    });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id; // make sure req.user is populated via auth middleware
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        status: 'error',
        message: 'Cart not found',
      });
    }
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    return res.status(200).json({
      status: 'success',
      message: 'Product removed from cart',
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while removing from cart',
      error: error.message,
    });
  }
};



export { addToCart, getCart, deleteFromCart,updateCart };