const orderService = require('..\services\orderService.js');

class OrderController {
    async crear(req, res) {
        try {
            const pedido = await orderService.crearPedido(req.body);
            res.status(201).json(pedido);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const pedidos = await orderService.obtenerPedidos();
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const pedido = await orderService.obtenerPedidoPorId(req.params.id);
            if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
            res.status(200).json(pedido);
        } catch (error) {
            res.status(400).json({ error: 'ID de pedido inválido' });
        }
    }

    async actualizarEstado(req, res) {
        try {
            const { estado } = req.body;
            const pedido = await orderService.actualizarEstado(req.params.id, estado);
            if (!pedido) return res.status(404).json({ error: 'Pedido no encontrado' });
            res.status(200).json(pedido);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new OrderController();