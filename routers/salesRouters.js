import express from 'express';
import { body } from 'express-validator';
import validateResult from '../middlewares/validate.js';
import { createSale, getSales } from '../controllers/salesController.js';

const router = express.Router();

// Ruta para crear una venta (POST /sales)
router.post(
  '/sales',
  [
    // Validaciones de datos que llegan desde el frontend:
    body('productId')
      .isMongoId().withMessage('El ID del producto debe ser un ObjectId válido'),

    body('quantity')
      .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor o igual a 1'),

    body('customerName')
      .isString()
      .isLength({ min: 2 }).withMessage('El nombre del cliente debe tener al menos 2 caracteres'),

    // Middleware que revisa si hubo errores y responde al frontend
    validateResult
  ],
  createSale // Controlador que maneja la lógica de crear la venta
);

// Ruta para obtener todas las ventas (GET /sales)
router.get('/sales', getSales);

export default router;
