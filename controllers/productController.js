const mongo = require("mongoose");
const Product = require("../models/product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all product
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new mongo.Types.ObjectId(id);
    const products = await Product.findById(objectId).populate('category'); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a product
exports.createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    const newProduct = new Product({ name, price, description, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
