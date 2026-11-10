const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcionCorta: { type: String, required: true },
    descripcionLarga: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 10 },
    categoria: { type: String, enum: ['personalizadas', 'frias', 'cheesecakes', 'mas'], required: true },
    etiqueta: { type: String, required: true },
    porciones: { type: String, required: true },
    iconoRendimiento: { type: String, default: 'fa-users' },
    imagen: { type: String, required: true },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);