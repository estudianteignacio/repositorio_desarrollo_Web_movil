const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  pedidoId: { type: String, required: true },
  monto: { type: Number, required: true },
  metodoPago: { type: String, enum: ['Webpay', 'Transferencia', 'Efectivo'], default: 'Webpay' },
  transaccionId: { type: String, required: true },
  estado: { type: String, enum: ['PAGADO', 'PENDIENTE', 'RECHAZADO'], default: 'PENDIENTE' }
}, { timestamps: true });

module.exports = mongoose.model('Pago', pagoSchema);