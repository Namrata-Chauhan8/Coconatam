import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB with proper options
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coconutam', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@coconutam.com" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@coconutam.com",
      password: "admin123",
      role: "admin",
      phone: "9876543210",
      address: {
        street: "Admin Address",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
    });

    await adminUser.save();
    console.log("Admin user created successfully");
    console.log("Email: admin@coconutam.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    // Wait a bit before disconnecting to ensure operations complete
    setTimeout(async () => {
      try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
      } catch (disconnectError) {
        console.error("Error disconnecting from MongoDB:", disconnectError);
      }
    }, 1000);
  }
};

// Run the seeder
createAdminUser();
