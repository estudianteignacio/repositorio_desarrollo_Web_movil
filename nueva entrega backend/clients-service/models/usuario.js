const mongoose = require('mongoose');

const direccionSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    detalle: { type: String, required: true },
    esPrincipal: { type: Boolean, default: false }
});

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, default: '' }, // no es obligatorio
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, default: '' },
    pass: { type: String, required: true },
    rol: { type: String, enum: ['ADMIN', 'CLIENTE'], default: 'CLIENTE' },
    direcciones: [direccionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);