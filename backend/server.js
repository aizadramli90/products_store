import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//console.log(process.env.MONGO_URI);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: `${products.length} products found`,
      data: products,
    });
  } catch (error) {
    console.error("Error in fetching product", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in create product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Id not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    const updateProduct = await Product.findByIdAndUpdate(id);
    if (!updateProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    //await Product.findByIdAndUpdate(id);
    res
      .status(200)
      .json({ success: true, message: "product was successfully updated" });
  } catch (error) {
    res.status(404).json({ success: false, message: "product not found" });
  }
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server connected at port http://localhost:${PORT}`);
});
