const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    pedidoId: { type: String, required: true },
    monto: { type: Number, required: true, min: 0 },
    metodo: { 
        type: String, 
        enum: ['tarjeta', 'transferencia', 'efectivo'], 
        required: true 
    },
    estado: { 
        type: String, 
        enum: ['pendiente', 'completado', 'rechazado'], 
        default: 'completado' 
    },
    transaccionId: { type: String },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);