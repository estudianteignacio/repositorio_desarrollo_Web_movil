const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    imagen: String
});

module.exports = mongoose.model('Producto', productoSchema);