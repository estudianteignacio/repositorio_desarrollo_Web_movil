const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    productoId: { type: String, required: true },
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
    precioUnitario: { type: Number, required: true }
});

const pedidoSchema = new mongoose.Schema({
    clienteId: { type: String, required: true },
    productos: [orderDetailSchema],
    total: { type: Number, required: true },
    estado: { 
        type: String, 
        enum: ['pendiente', 'en preparación', 'enviado', 'entregado', 'cancelado'], 
        default: 'pendiente' 
    },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);