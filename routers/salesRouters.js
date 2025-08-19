import express from 'express';
   import { body } from 'express-validator';
   import validateResult from '../middlewares/validate.js';
   import { createProduct, getProducts, createSale, getSales } from '../controllers/salesController.js';

   const router = express.Router();

   router.post('/sales', [
     body('productId').isMongoId().withMessage('El ID del producto debe ser un ObjectId válido'),
     body('quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor o igual a 1'),
     body('customerName').isString().isLength({ min: 2 }).withMessage('El nombre del cliente debe tener al menos 2 caracteres'),
     validateResult
   ], createSale);

   router.get('/sales', getSales);

   export default router;