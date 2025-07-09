const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: String,
});

const ProductGroupSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "ProductGroup" },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", CategorySchema);
const ProductGroup = mongoose.model("ProductGroup", ProductGroupSchema);
const Product = mongoose.model("Product", ProductSchema);
const User = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { Category, ProductGroup, Product, User, Order };
