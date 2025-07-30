import Product from '../models/Product.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
      });
    }

    if (isNaN(price) || isNaN(stock)) {
      return res.status(400).json({
        status: 'error',
        message: 'Price and stock must be valid numbers',
      });
    }

    const productExists = await Product.findOne({ name });
    if (productExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Product already exists',
      });
    }

    const productImageLocalPath = req.files?.productimages?.[0]?.path;
    console.log('productImageLocalPath: ', productImageLocalPath);

    const productImages = await uploadOnCloudinary(productImageLocalPath);
    console.log('productImages: ', productImages);

    if (!productImages) {
      throw new ApiError(400, 'Product image upload failed');
    }
    console.log('here');

    const product = await Product.create({
      name,
      price,
      description,
      category,
      productImage: productImages.secure_url,
      stock,
    });
    console.log('product: ', product);

    return res.status(200).json({
      status: 'success',
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getAdminAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || '';
    const category = req.query.category || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'desc' ? -1 : 1;

    const query = {
      name: { $regex: search, $options: 'i' },
    };

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      status: 'success',
      page,
      limit,
      total,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }
    const productImageLocalPath = req.files?.productimages?.[0]?.path;
    let productImage = product.productImage;
    if (productImageLocalPath) {
      const uploadedImage = await uploadOnCloudinary(productImageLocalPath);
      if (!uploadedImage) {
        throw new ApiError(400, 'Product image upload failed');
      }
      productImage = uploadedImage.secure_url;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        productImage,
        stock,
      },
      { new: true }
    );
    await updatedProduct.save();

    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  }
};



export { addProduct, getAdminAllProducts, updateProduct, deleteProduct };
