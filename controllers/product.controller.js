import { getDB } from "../db/config.js";

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    // Obtener último id y sumarle 1
    const lastProduct = await collection.find().sort({ id: -1 }).limit(1).toArray();
    const newId = lastProduct.length > 0 ? lastProduct[0].id + 1 : 1;

    const newProduct = {
      id: newId,
      ...req.body,
      createdAt: new Date()
    };

    await collection.insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al crear producto" });
  }
};

// Listar productos
export const getProducts = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");
    const products = await collection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al obtener productos" });
  }
};

// Obtener producto por id
export const getProductById = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    const productId = parseInt(req.params.id);
    const product = await collection.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ message: "⚠️ Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al obtener producto" });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    const productId = parseInt(req.params.id);
    const result = await collection.updateOne(
      { id: productId },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "⚠️ Producto no encontrado" });
    }

    res.json({ message: "✅ Producto actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    const productId = parseInt(req.params.id);
    const result = await collection.deleteOne({ id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "⚠️ Producto no encontrado" });
    }

    res.json({ message: "🗑️ Producto eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error al eliminar producto" });
  }
};
