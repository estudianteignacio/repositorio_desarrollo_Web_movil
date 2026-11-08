const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    usuarioId: String,
    total: Number,
    estado: String,
    fecha: Date
});

module.exports = mongoose.model('Pedido', pedidoSchema);