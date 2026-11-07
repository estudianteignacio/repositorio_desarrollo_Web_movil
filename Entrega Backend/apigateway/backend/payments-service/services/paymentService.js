const Payment = require('..\models\aymentModel');

class PaymentService {
    async procesarPago(data) {
        if (!data.pedidoId || !data.monto || !data.metodo) {
            throw new Error('Faltan datos obligatorios para procesar el pago (pedidoId, monto, metodo).');
        }
        
        // Simulación de respuesta de pasarela de pagos (ej. Webpay)
        const nuevoPago = new Payment({
            ...data,
            transaccionId: `TXN-${Math.floor(Math.random() * 1000000)}`,
            estado: 'completado'
        });

        return await nuevoPago.save();
    }

    async obtenerPagos() {
        return await Payment.find();
    }

    async obtenerPagoPorId(id) {
        return await Payment.findById(id);
    }
}

module.exports = new PaymentService();