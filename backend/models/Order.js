import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD", "EUR"],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for item total
orderItemSchema.virtual("total").get(function () {
  return this.price * this.quantity;
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      unique: true,
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required"],
      min: [0, "Subtotal cannot be negative"],
    },
    tax: {
      type: Number,
      default: 0,
      min: [0, "Tax cannot be negative"],
    },
    shipping: {
      type: Number,
      default: 0,
      min: [0, "Shipping cannot be negative"],
    },
    total: {
      type: Number,
      required: [true, "Total is required"],
      min: [0, "Total cannot be negative"],
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD", "EUR"],
    },
    status: {
      type: String,
      required: [true, "Order status is required"],
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment status is required"],
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["razorpay", "cod", "bank_transfer"],
    },
    razorpayOrderId: {
      type: String,
      sparse: true,
    },
    razorpayPaymentId: {
      type: String,
      sparse: true,
    },
    shippingAddress: {
      name: {
        type: String,
        required: [true, "Shipping name is required"],
      },
      phone: {
        type: String,
        required: [true, "Shipping phone is required"],
      },
      address: {
        type: String,
        required: [true, "Shipping address is required"],
      },
      city: {
        type: String,
        required: [true, "Shipping city is required"],
      },
      state: {
        type: String,
        required: [true, "Shipping state is required"],
      },
      pincode: {
        type: String,
        required: [true, "Shipping pincode is required"],
      },
      country: {
        type: String,
        default: "India",
      },
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for formatted total
orderSchema.virtual("formattedTotal").get(function () {
  return `${this.currency} ${this.total.toFixed(2)}`;
});

// Pre-save middleware to calculate totals
orderSchema.pre("save", function (next) {
  if (this.isModified("items")) {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.total = this.subtotal + this.tax + this.shipping;
  }
  next();
});

// Method to generate order ID
orderSchema.statics.generateOrderId = function () {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `CO${timestamp}${random}`;
};

// Index for better performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });


const Order = mongoose.model("Order", orderSchema);
export default Order;

