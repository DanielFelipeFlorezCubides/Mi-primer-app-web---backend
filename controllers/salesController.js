import Sale from '../models/Sale.js';

// Controlador para crear una venta
export const createSale = async (req, res) => {
  try {
    // Datos que llegan desde el frontend en el body
    const { productId, quantity, customerName } = req.body;

    // Buscar el producto en la BD por su ID
    const product = await Product.findById(productId);
    if (!product) {
      // Si no existe, avisamos al frontend
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar que el stock sea suficiente
    if (product.quantity < quantity) {
      // Si no hay suficiente, el frontend debe manejar este error
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    // Calcular el precio total de la venta
    const totalPrice = product.price * quantity;

    // Crear un nuevo documento de venta
    const sale = new Sale({ productId, quantity, totalPrice, customerName });
    await sale.save();

    // Actualizar el stock del producto restando lo vendido
    await Product.findByIdAndUpdate(productId, { $inc: { quantity: -quantity } });

    // Respuesta exitosa con la venta creada (importante para mostrar confirmación en frontend)
    res.status(201).json({ message: 'Venta creada', sale });
  } catch (error) {
    // En caso de error interno (por ejemplo fallo en DB)
    res.status(500).json({ error: 'Error al crear venta', details: error.message });
  }
};

// Controlador para obtener todas las ventas
export const getSales = async (req, res) => {
  try {
    // Trae todas las ventas y además incluye datos del producto relacionado
    const sales = await Sale.find().populate('productId', 'name price');

    // Se devuelve al frontend la lista de ventas con info básica de cada producto
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas', details: error.message });
  }
};
