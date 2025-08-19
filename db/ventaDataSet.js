import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';

   // Cargar variables de entorno
   dotenv.config();

   // Conexión a MongoDB
   const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/game_store';

   mongoose.connect(mongodbUri)
     .then(() => console.log('Conectado a MongoDB para seeding'))
     .catch(err => {
       console.error('Error al conectar a MongoDB:', err.message);
       process.exit(1);
     });

   // Datos de prueba para productos
   const products = [
     {
       name: 'The Legend of Zelda: Breath of the Wild',
       type: 'game',
       price: 59.99,
       quantity: 15,
       createdAt: new Date('2025-08-01T10:00:00.000Z')
     },
     {
       name: 'PlayStation 5',
       type: 'console',
       price: 499.99,
       quantity: 5,
       createdAt: new Date('2025-08-01T10:00:00.000Z')
     },
     {
       name: 'Super Mario Odyssey',
       type: 'game',
       price: 49.99,
       quantity: 20,
       createdAt: new Date('2025-08-02T12:00:00.000Z')
     },
     {
       name: 'Nintendo Switch',
       type: 'console',
       price: 299.99,
       quantity: 10,
       createdAt: new Date('2025-08-02T12:00:00.000Z')
     },
     {
       name: 'Cyberpunk 2077',
       type: 'game',
       price: 39.99,
       quantity: 12,
       createdAt: new Date('2025-08-03T15:00:00.000Z')
     }
   ];

   // Datos de prueba para ventas (se generarán después de insertar productos)
   const sales = [
     {
       quantity: 2,
       customerName: 'Juan Pérez',
       createdAt: new Date('2025-08-10T14:00:00.000Z')
     },
     {
       quantity: 1,
       customerName: 'María Gómez',
       createdAt: new Date('2025-08-11T16:00:00.000Z')
     },
     {
       quantity: 3,
       customerName: 'Carlos López',
       createdAt: new Date('2025-08-12T10:00:00.000Z')
     }
   ];

   // Función para limpiar la base de datos (opcional)
   const clearDatabase = async () => {
     try {
       await Product.deleteMany({});
       await Sale.deleteMany({});
       console.log('Base de datos limpiada');
     } catch (error) {
       console.error('Error al limpiar la base de datos:', error.message);
       process.exit(1);
     }
   };

   // Función para insertar datos
   const seedDatabase = async () => {
     try {
       // Opcional: Limpiar la base de datos antes de insertar
       await clearDatabase();

       // Insertar productos
       const insertedProducts = await Product.insertMany(products);
       console.log(`${insertedProducts.length} productos insertados`);

       // Asignar productId y calcular totalPrice para las ventas
       const salesWithProductId = sales.map((sale, index) => ({
         ...sale,
         productId: insertedProducts[index % insertedProducts.length]._id,
         totalPrice: insertedProducts[index % insertedProducts.length].price * sale.quantity
       }));

       // Insertar ventas
       const insertedSales = await Sale.insertMany(salesWithProductId);
       console.log(`${insertedSales.length} ventas insertadas`);

       console.log('Seeding completado');
       mongoose.connection.close();
     } catch (error) {
       console.error('Error al insertar datos:', error.message);
       process.exit(1);
     }
   };

   // Ejecutar el seeding
   seedDatabase();