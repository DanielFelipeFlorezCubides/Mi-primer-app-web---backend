import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("tipo").isIn(["juego", "consola"]).withMessage("El tipo debe ser 'juego' o 'consola'"),
    body("precio").isFloat({ gt: 0 }).withMessage("El precio debe ser mayor que 0"),
    body("cantidad").isInt({ min: 0 }).withMessage("La cantidad debe ser un entero positivo"),
    validateFields
  ],
  createProduct
);

router.get("/", getProducts);
router.get("/:id", getProductById);

router.put(
  "/:id",
  [
    body("nombre").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
    body("tipo").optional().isIn(["juego", "consola"]).withMessage("El tipo debe ser 'juego' o 'consola'"),
    body("precio").optional().isFloat({ gt: 0 }).withMessage("El precio debe ser mayor que 0"),
    body("cantidad").optional().isInt({ min: 0 }).withMessage("La cantidad debe ser un entero positivo"),
    validateFields
  ],
  updateProduct
);

router.delete("/:id", deleteProduct);

export default router;
