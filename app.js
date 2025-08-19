// Imports
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
   app.use(cors());
   app.use(express.json());

   // Conexión a MongoDB
   mongoose.connect(mongodbUri)
     .then(() => console.log('Conectado a MongoDB'))
     .catch(err => console.error('Error al conectar a MongoDB:', err.message));

   // Rutas
   app.get('/', (req, res) => {
     res.send('Bienvenido a la API de Game Store');
   });

   app.use('/v1/sales', salesRoutes);

   // Ejecución de la app
   app.listen(port, () => {
     console.log(`Servidor ejecutándose en http://localhost:${port}`);
   });