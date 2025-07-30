# Coconutam Backend API

A comprehensive Node.js/Express backend for the Coconutam e-commerce platform with Razorpay payment integration and MongoDB database.

## Features

- **Authentication System**: JWT-based authentication with role-based access
- **Admin Panel**: Complete admin dashboard for product and order management
- **Product Management**: Full CRUD operations for products
- **Shopping Cart**: Add, update, remove items from cart
- **Order Management**: Create and track orders
- **Payment Integration**: Razorpay payment gateway
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Input validation using express-validator
- **Security**: Helmet for security headers, CORS configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Razorpay account and API keys

## Installation

1. **Clone the repository and navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/coconutam

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d

   # Razorpay Configuration
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start MongoDB** (if using local MongoDB)

   ```bash
   mongod
   ```

5. **Seed the database with products**

   ```bash
   node utils/dataSeeder.js
   ```

6. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Authentication

The system uses JWT-based authentication with role-based access control:

### User Roles

- **user**: Regular customers who can browse products, manage cart, and place orders
- **admin**: Administrators who can manage products, orders, and access the admin panel

### Default Admin Account

- **Email**: admin@coconutam.com
- **Password**: admin123

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user

## Admin Panel

The admin panel provides a comprehensive dashboard for managing the e-commerce platform:

### Features

- **Dashboard**: Overview with statistics and recent orders
- **Product Management**: Add, edit, delete products with bulk import
- **Order Management**: View and manage customer orders
- **User Management**: View user accounts
- **Analytics**: Sales charts and top products
- **Settings**: Profile and password management

### Access

- Navigate to `/admin/dashboard.html` after logging in as admin
- Admin users are automatically redirected to the admin panel

## API Endpoints

### Products

| Method | Endpoint                    | Description                                  |
| ------ | --------------------------- | -------------------------------------------- |
| GET    | `/api/products`             | Get all products with pagination and filters |
| GET    | `/api/products/:id`         | Get single product                           |
| GET    | `/api/products/categories`  | Get all product categories                   |
| POST   | `/api/products`             | Create new product (Admin)                   |
| PUT    | `/api/products/:id`         | Update product (Admin)                       |
| DELETE | `/api/products/:id`         | Delete product (Admin)                       |
| POST   | `/api/products/bulk-import` | Bulk import products (Admin)                 |

**Query Parameters for GET /api/products:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `search`: Search in product name and description
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `availability`: Filter by availability status
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: Sort order - 'asc' or 'desc' (default: desc)

### Cart

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| GET    | `/api/cart`                   | Get user's cart           |
| GET    | `/api/cart/summary`           | Get cart summary          |
| POST   | `/api/cart/add`               | Add item to cart          |
| PUT    | `/api/cart/update/:productId` | Update cart item quantity |
| DELETE | `/api/cart/remove/:productId` | Remove item from cart     |
| DELETE | `/api/cart/clear`             | Clear entire cart         |

### Orders

| Method | Endpoint                      | Description          |
| ------ | ----------------------------- | -------------------- |
| GET    | `/api/orders`                 | Get user's orders    |
| GET    | `/api/orders/:orderId`        | Get single order     |
| GET    | `/api/orders/stats`           | Get order statistics |
| PUT    | `/api/orders/:orderId/cancel` | Cancel order         |

### Payments

| Method | Endpoint                        | Description              |
| ------ | ------------------------------- | ------------------------ |
| POST   | `/api/payments/create-order`    | Create Razorpay order    |
| POST   | `/api/payments/verify`          | Verify payment signature |
| GET    | `/api/payments/status/:orderId` | Get payment status       |
| POST   | `/api/payments/refund`          | Create refund (Admin)    |

## Request/Response Examples

### Create Product

```json
POST /api/products
{
  "name": "Coconut Shell Candle",
  "size": "5cm diameter",
  "description": "Handcrafted coconut shell candle with natural fragrance",
  "price": 299,
  "currency": "INR",
  "stock": 50,
  "images": ["https://example.com/candle1.jpg"],
  "category": "Candles",
  "tags": ["coconut", "candle", "handcrafted"]
}
```

### Add to Cart

```json
POST /api/cart/add
{
  "productId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "quantity": 2
}
```

### Create Order

```json
POST /api/payments/create-order
{
  "cartId": "60f7b3b3b3b3b3b3b3b3b3b3b3",
  "shippingAddress": {
    "name": "John Doe",
    "phone": "9876543210",
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  }
}
```

## Database Schema

### Product Schema

```javascript
{
  name: String (required),
  size: String (required),
  description: String (required),
  price: Number (required),
  currency: String (default: 'INR'),
  stock: Number (required),
  images: [String] (required),
  availability: String (enum: ['In Stock', 'Out of Stock', 'Low Stock']),
  category: String (required),
  tags: [String],
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema

```javascript
{
  userId: String (required),
  items: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number (required),
    price: Number (required),
    currency: String (default: 'INR')
  }],
  total: Number (default: 0),
  currency: String (default: 'INR'),
  isActive: Boolean (default: true),
  expiresAt: Date
}
```

### Order Schema

```javascript
{
  orderId: String (required, unique),
  userId: String (required),
  items: [{
    product: ObjectId (ref: 'Product'),
    name: String (required),
    quantity: Number (required),
    price: Number (required),
    currency: String (default: 'INR')
  }],
  subtotal: Number (required),
  tax: Number (default: 0),
  shipping: Number (default: 0),
  total: Number (required),
  currency: String (default: 'INR'),
  status: String (enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  paymentStatus: String (enum: ['pending', 'paid', 'failed', 'refunded']),
  paymentMethod: String (required),
  razorpayOrderId: String,
  razorpayPaymentId: String,
  shippingAddress: {
    name: String (required),
    phone: String (required),
    address: String (required),
    city: String (required),
    state: String (required),
    pincode: String (required),
    country: String (default: 'India')
  },
  notes: String,
  isActive: Boolean (default: true)
}
```

## Razorpay Integration

The backend integrates with Razorpay for payment processing:

1. **Create Order**: Creates a Razorpay order when user proceeds to checkout
2. **Payment Verification**: Verifies payment signature to ensure security
3. **Stock Management**: Updates product stock after successful payment
4. **Refund Processing**: Handles refunds through Razorpay API

## Error Handling

All endpoints return consistent error responses:

```json
{
  "status": "error",
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

## Security Features

- **Input Validation**: All inputs are validated using express-validator
- **Security Headers**: Helmet middleware for security headers
- **CORS Configuration**: Configurable CORS settings
- **Payment Verification**: Cryptographic signature verification for payments
- **SQL Injection authenticationion**: MongoDB with parameterized queries

## Development

### Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `node utils/dataSeeder.js`: Seed database with products

### Environment Variables

Make sure to set up all required environment variables in your `.env` file before starting the server.

## Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production MongoDB connection string
3. Set up proper CORS origins for your frontend domain
4. Configure Razorpay production keys
5. Use a process manager like PM2 for production deployment

## Support

For any issues or questions, please refer to the API documentation or contact the development team.
