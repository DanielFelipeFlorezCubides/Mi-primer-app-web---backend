import { getDB } from "../db/config.js";

const collectionName = "products";

export const ProductModel = {
  async create(productData) {
    const db = getDB();

    // Buscar el último ID usado
    const lastProduct = await db.collection(collectionName)
      .find()
      .sort({ id: -1 })
      .limit(1)
      .toArray();

    const newId = lastProduct.length > 0 ? lastProduct[0].id + 1 : 1;

    const newProduct = { id: newId, ...productData };
    await db.collection(collectionName).insertOne(newProduct);

    return newProduct;
  },

  async findAll() {
    const db = getDB();
    return db.collection(collectionName).find().toArray();
  },

  async findById(id) {
    const db = getDB();
    return db.collection(collectionName).findOne({ id: Number(id) });
  },

  async update(id, data) {
    const db = getDB();
    const result = await db
      .collection(collectionName)
      .findOneAndUpdate(
        { id: Number(id) },
        { $set: data },
        { returnDocument: "after" }
      );
    return result.value;
  },

  async delete(id) {
    const db = getDB();
    const result = await db.collection(collectionName).deleteOne({ id: Number(id) });
    return result.deletedCount > 0;
  }
};