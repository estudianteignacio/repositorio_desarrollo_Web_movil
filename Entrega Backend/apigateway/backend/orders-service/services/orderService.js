const Pedido = require('../models/pedidoModel');

class OrderService {
    async crearPedido(data) {
        if (!data.productos || data.productos.length === 0) {
            throw new Error('El pedido debe contener al menos un producto.');
        }
        const nuevoPedido = new Pedido(data);
        return await nuevoPedido.save();
    }

    async obtenerPedidos() {
        return await Pedido.find();
    }

    async obtenerPedidoPorId(id) {
        return await Pedido.findById(id);
    }

    async actualizarEstado(id, nuevoEstado) {
        const estadosValidos = ['pendiente', 'en preparación', 'enviado', 'entregado', 'cancelado'];
        if (!estadosValidos.includes(nuevoEstado)) {
            throw new Error('Estado de pedido inválido.');
        }
        return await Pedido.findByIdAndUpdate(
            id, 
            { estado: nuevoEstado }, 
            { new: true }
        );
    }
}

module.exports = new OrderService();