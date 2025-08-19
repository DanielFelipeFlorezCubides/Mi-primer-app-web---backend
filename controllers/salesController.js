   import Sale from '../models/Sale.js';

   export const createSale = async (req, res) => {
     try {
       const { productId, quantity, customerName } = req.body;
       const product = await Product.findById(productId);
       if (!product) {
         return res.status(404).json({ error: 'Producto no encontrado' });
       }
       if (product.quantity < quantity) {
         return res.status(400).json({ error: 'Stock insuficiente' });
       }
       const totalPrice = product.price * quantity;
       const sale = new Sale({ productId, quantity, totalPrice, customerName });
       await sale.save();
       await Product.findByIdAndUpdate(productId, { $inc: { quantity: -quantity } });
       res.status(201).json({ message: 'Venta creada', sale });
     } catch (error) {
       res.status(500).json({ error: 'Error al crear venta', details: error.message });
     }
   };

   export const getSales = async (req, res) => {
     try {
       const sales = await Sale.find().populate('productId', 'name price');
       res.status(200).json(sales);
     } catch (error) {
       res.status(500).json({ error: 'Error al obtener ventas', details: error.message });
     }
   };