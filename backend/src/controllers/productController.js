import db from "../config/db.js";
import * as ProductModal from "../models/productModal.js";
import { format } from "date-fns";

export const getProducts = async (req, res) => {
  try {
    const startOffset = req.params.startOffset;
    const pageSize = req.params.pageSize;

    const [query] = await ProductModal.getProducts(startOffset, pageSize);
    let output = [];

    for (let i = 0; i < query.length; i++) {
      const product = query[i];
      const images = JSON.parse(product.image)
      const outputProduct = {...product, image : images}
      output.push(outputProduct)
    }
    res.status(200).json({ products: output });
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const [query] = await ProductModal.getProductById(productId);
    
    if (query.length == 0) {
      res.status(404).json({ message: "Product not found" });
    } else {
      const product = query[0]
      const images = JSON.parse(product.image)
      const outputProduct = {...product, image: images}
      res.status(200).json({ message: "Product found", product: outputProduct });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const image = JSON.stringify(product.image)

    const productDetails = {
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      createdAt,
      image
    };

    const [query] = await ProductModal.addProduct(productDetails);

    if (query.affectedRows > 0) {
      res.status(200).json({ message: "Product added successfully" });
    } else {
      res.status(400).json({ message: "Product could not be added" });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};

export const editProduct = async (req, res) => {
  try {
    const product = req.body;
    const updatedAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const image = JSON.stringify(product.image)

    const editedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      updatedAt,
      image,
    };

    const [query] = await ProductModal.editProduct(editedProduct);

    if (query.affectedRows > 0) {
      res.status(200).json({ message: "Product edited successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const [query] = await ProductModal.deleteProduct(productId);

    if (query.affectedRows > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};
