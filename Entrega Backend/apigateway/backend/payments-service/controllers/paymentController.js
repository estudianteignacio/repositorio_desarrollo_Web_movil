const paymentService = require('../services/paymentService');

class PaymentController {
    async procesar(req, res) {
        try {
            const pago = await paymentService.procesarPago(req.body);
            res.status(201).json(pago);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async listar(req, res) {
        try {
            const pagos = await paymentService.obtenerPagos();
            res.status(200).json(pagos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerPorId(req, res) {
        try {
            const pago = await paymentService.obtenerPagoPorId(req.params.id);
            if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
            res.status(200).json(pago);
        } catch (error) {
            res.status(400).json({ error: 'ID de pago inválido' });
        }
    }
}

module.exports = new PaymentController();