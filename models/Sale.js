import mongoose from 'mongoose';

   const saleSchema = new mongoose.Schema({
     productId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Product',
       required: [true, 'El ID del producto es obligatorio']
     },
     quantity: {
       type: Number,
       required: [true, 'La cantidad es obligatoria'],
       min: [1, 'La cantidad debe ser al menos 1']
     },
     totalPrice: {
       type: Number,
       required: [true, 'El precio total es obligatorio'],
       min: [0, 'El precio total debe ser mayor o igual a 0']
     },
     customerName: {
       type: String,
       required: [true, 'El nombre del cliente es obligatorio'],
       minlength: [2, 'El nombre del cliente debe tener al menos 2 caracteres']
     },
     createdAt: {
       type: Date,
       default: Date.now
     }
   });

   export default mongoose.model('Sale', saleSchema);