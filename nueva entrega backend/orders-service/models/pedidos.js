const mongoose = require('mongoose');

const itemPedidoSchema = new mongoose.Schema({
    productoId: { type: mongoose.Schema.Types.ObjectId, required: true },
    nombre: { type: String, required: true },
    detalle: { type: String },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true, min: 1 }
});

const pedidoSchema = new mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, required: true },
    clienteEmail: { type: String, required: true },
    productos: [itemPedidoSchema],
    total: { type: Number, required: true },
    metodoPago: { type: String, enum: ['tarjeta', 'transferencia', 'efectivo'], required: true },
    direccionEnvio: { type: String, required: true },
    estado: { type: String, enum: ['Recibido', 'En Proceso', 'Repartiendo', 'Entregado'], default: 'En Proceso' },
    fecha: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);