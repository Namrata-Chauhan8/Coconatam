#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Setting up Coconutam Backend...\n");

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error("❌ Node.js is not installed. Please install Node.js first.");
  process.exit(1);
}

// Check if package.json exists
const packageJsonPath = path.join(__dirname, "package.json");
if (!fs.existsSync(packageJsonPath)) {
  console.error(
    "❌ package.json not found. Please run this script from the backend directory."
  );
  process.exit(1);
}

// Install dependencies
console.log("\n📦 Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit" });
  console.log("✅ Dependencies installed successfully");
} catch (error) {
  console.error("❌ Failed to install dependencies");
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, ".env");
const envExamplePath = path.join(__dirname, "env.example");

if (!fs.existsSync(envPath)) {
  console.log("\n🔧 Creating .env file...");
  try {
    fs.copyFileSync(envExamplePath, envPath);
    console.log("✅ .env file created successfully");
    console.log(
      "⚠️  Please edit .env file with your configuration before starting the server"
    );
  } catch (error) {
    console.error("❌ Failed to create .env file");
    process.exit(1);
  }
} else {
  console.log("✅ .env file already exists");
}

// Check if MongoDB is running
console.log("\n🔍 Checking MongoDB connection...");
try {
  const mongoose = require("mongoose");
  const testConnection = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/coconutam", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log("✅ MongoDB connection successful");
      await mongoose.disconnect();
    } catch (error) {
      console.warn(
        "⚠️  MongoDB connection failed. Make sure MongoDB is running."
      );
      console.warn("   You can start MongoDB with: mongod");
    }
  };
  testConnection();
} catch (error) {
  console.warn("⚠️  Could not test MongoDB connection");
}

// Seed database
console.log("\n🌱 Seeding database with products...");
try {
  require("./utils/dataSeeder");
  console.log("✅ Database seeded successfully");
} catch (error) {
  console.error("❌ Failed to seed database:", error.message);
}

// Create admin user
console.log("\n🔧 Creating admin user...");
try {
  const { execSync } = require("child_process");
  execSync("node utils/adminSeeder.js", { stdio: "inherit" });
  console.log("✅ Admin user created successfully");
} catch (error) {
  console.error("❌ Failed to create admin user:", error.message);
}

console.log("\n🎉 Setup completed successfully!");
console.log("\n📋 Next steps:");
console.log("1. Edit .env file with your configuration");
console.log("2. Start MongoDB: mongod");
console.log("3. Start the server: npm run dev");
console.log("4. Admin login: admin@coconutam.com / admin123");
console.log("5. Test the API: http://localhost:5000/api/health");
console.log(
  "6. View integration example: http://localhost:5000/integration-example.html"
);
console.log("\n📚 For more information, see README.md");
