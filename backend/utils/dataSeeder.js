import mongoose from "mongoose";
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";


// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/coconutam",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Read and parse the details.json file
const loadProductData = () => {
  try {
    const dataPath = path.join(__dirname, "../../Detail.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const products = JSON.parse(rawData);
    return products;
  } catch (error) {
    console.error("Error reading Detail.json:", error);
    return [];
  }
};

// Transform product data to match our schema
const transformProductData = (products) => {
  return products.map((product, index) => ({
    name: product.name,
    size: product.size,
    description: product.description,
    price: product.price,
    currency: product.currency || "INR",
    stock: product.stock,
    images: [product.images], // Convert single image to array
    availability: product.availability,
    category: getCategoryFromName(product.name),
    tags: generateTags(product.name),
    isActive: true,
  }));
};

// Helper function to determine category from product name
const getCategoryFromName = (name) => {
  const nameLower = name.toLowerCase();

  if (nameLower.includes("candle")) return "Candles";
  if (nameLower.includes("cup") || nameLower.includes("tea"))
    return "Kitchenware";
  if (nameLower.includes("planter") || nameLower.includes("hanging"))
    return "Garden Decor";
  if (nameLower.includes("pen") || nameLower.includes("holder"))
    return "Office Accessories";
  if (nameLower.includes("bowl")) return "Kitchenware";

  return "Home Decor";
};

// Helper function to generate tags
const generateTags = (name) => {
  const nameLower = name.toLowerCase();
  const tags = ["coconut", "handcrafted", "eco-friendly"];

  if (nameLower.includes("candle")) tags.push("candle", "fragrance");
  if (nameLower.includes("cup")) tags.push("tea", "kitchen");
  if (nameLower.includes("planter")) tags.push("garden", "plant");
  if (nameLower.includes("pen")) tags.push("office", "stationery");
  if (nameLower.includes("bowl")) tags.push("kitchen", "serving");

  return tags;
};

// Seed products
const seedProducts = async () => {
  try {
    console.log("Starting product seeding...");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Load and transform product data
    const rawProducts = loadProductData();
    const transformedProducts = transformProductData(rawProducts);

    if (transformedProducts.length === 0) {
      console.log("No products to seed");
      return;
    }

    // Insert products
    const createdProducts = await Product.insertMany(transformedProducts);

    console.log(`Successfully seeded ${createdProducts.length} products`);

    // Display seeded products
    createdProducts.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.name} - ${product.category} - ₹${
          product.price
        }`
      );
    });
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

// Main seeding function
const runSeeder = async () => {
  try {
    await connectDB();
    await seedProducts();
    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  runSeeder();
}

module.exports = {
  seedProducts,
  transformProductData,
  loadProductData,
};
