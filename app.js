// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./db/config.js";
import productRoutes from "./routers/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connect();

// Rutas
app.use("/api/products", productRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
