import { validationResult } from 'express-validator';

// Middleware que revisa si hubo errores en las validaciones previas
const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  // Si existen errores de validación (inputs inválidos)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Errores de validación',
      details: errors.array() // Lista de errores: campo, mensaje, etc.
    });
  }

  // Si no hay errores, pasa al siguiente middleware/controlador
  next();
};

export default validateResult;
