import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("❌ No se encontró la variable MONGO_URI en .env");
}

const client = new MongoClient(uri);

const products = [
  { id: 1, nombre: "The Legend of Zelda: Tears of the Kingdom", tipo: "juego", precio: 70, cantidad: 15 },
  { id: 2, nombre: "PlayStation 5", tipo: "consola", precio: 499, cantidad: 8 },
  { id: 3, nombre: "Xbox Series X", tipo: "consola", precio: 499, cantidad: 5 },
  { id: 4, nombre: "Nintendo Switch OLED", tipo: "consola", precio: 349, cantidad: 10 },
  { id: 5, nombre: "Elden Ring", tipo: "juego", precio: 60, cantidad: 6 },
];

const seedDB = async () => {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("products");

    // Limpia y re-inserta
    await collection.deleteMany({});
    await collection.insertMany(products);

    console.log("🌱 Base de datos sembrada con éxito");
  } catch (error) {
    console.error("❌ Error al sembrar la base de datos:", error);
  } finally {
    await client.close();
  }
};

seedDB();