import { validationResult } from 'express-validator';

   const validateResult = (req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({
         error: 'Errores de validación',
         details: errors.array()
       });
     }
     next();
   };

   export default validateResult;