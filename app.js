// Imports principales
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import salesRoutes from './routers/salesRouters.js';

// Configuración inicial
dotenv.config();
const app = express();

// Definición de variables
const port = process.env.PORT || 5500;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/game_store';

// Middleware
app.use(cors()); // Permite llamadas desde el frontend
app.use(express.json()); // Permite enviar/recibir JSON en el body

// Conexión a MongoDB
mongoose.connect(mongodbUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err.message));

// -----------------------------
// RUTAS DISPONIBLES PARA FRONTEND
// -----------------------------

// Ruta raíz (GET /)
// Sirve solo para verificar que la API esté funcionando.
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Game Store');
});

// Rutas de ventas → prefijo /v1/sales
// Contienen todo lo relacionado con las ventas
app.use('/v1/sales', salesRoutes);
/*
  📌 RUTAS DE VENTAS (prefijo: /v1/sales)

  1. POST /v1/sales/sales
     ➡️ Crear una nueva venta.
     - Body requerido (JSON):
       {
         "productId": "ObjectId del producto",
         "quantity": 2,                // número entero >= 1
         "customerName": "Juan Pérez"  // al menos 2 caracteres
       }
     - Validaciones:
       ❌ 400 → errores de validación (ej: cantidad < 1, nombre muy corto).
       ❌ 404 → producto no encontrado.
       ❌ 500 → error interno.
     - Respuesta exitosa (201):
       {
         "message": "Venta creada",
         "sale": { ...datos de la venta... }
       }

  2. GET /v1/sales/sales
     ➡️ Obtener todas las ventas registradas.
     - Respuesta exitosa (200):
       [
         {
           "_id": "idVenta",
           "productId": { "name": "Camiseta", "price": 25000 },
           "quantity": 2,
           "totalPrice": 50000,
           "customerName": "Juan Pérez",
           "createdAt": "2025-08-18T20:15:30.000Z"
         }
       ]
     - Posibles errores:
       ❌ 500 → error interno al consultar las ventas.
*/

// Ejecución de la app
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
