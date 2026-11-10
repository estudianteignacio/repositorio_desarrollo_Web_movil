const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pago = require('./models/pago');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bdunab2')
  .then(() => console.log('>>> [Payments Service] Conectado a MongoDB local'))
  .catch(err => console.error(err));

const INTERNAL_SECRET = process.env.INTERNAL_GATEWAY_SECRET || "sk_live_unab_gateway_secure_token_2026";
const WEBPAY_SECRET_KEY = process.env.WEBPAY_SECRET || "tbk_secret_prod_unab_2026"; // Simulación Vault

const verificarSecreto = (req, res, next) => {
  if (req.headers['x-gateway-secret'] !== INTERNAL_SECRET) {
    return res.status(403).json({ error: "Acceso denegado a payments-service: sin credencial interna." });
  }
  next();
};

// Iniciar procesamiento de pago (Simulación Transbank / Webpay)
app.post('/payments/process', verificarSecreto, async (req, res) => {
  try {
    const { pedidoId, monto, metodoPago } = req.body;
    if (!pedidoId || !monto) return res.status(400).json({ error: "Datos de pago incompletos." });

    // Simulación de interacción con pasarela externa usando la clave secreta
    const transaccionId = "TBK-" + Date.now();
    const nuevoPago = new Pago({
      pedidoId,
      monto,
      metodoPago: metodoPago || 'Webpay',
      transaccionId,
      estado: 'PAGADO'
    });

    await nuevoPago.save();
    res.status(201).json({
      mensaje: "Pago procesado exitosamente mediante pasarela externa",
      pago: nuevoPago,
      tokenWebpay: WEBPAY_SECRET_KEY.slice(0, 6) + "*****" // Referencia tokenizada
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/payments/:pedidoId', verificarSecreto, async (req, res) => {
  try {
    const pago = await Pago.findOne({ pedidoId: req.params.pedidoId });
    if (!pago) return res.status(404).json({ error: "Registro de pago no encontrado." });
    res.json(pago);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const resolvers = {
  Query: {
    obtenerClientes: async () => {
      try {
        // Cambia el puerto '3001' si tu microservicio de clientes corre en otro puerto
        const response = await fetch('http://localhost:3001/clientes'); 
        return await response.json();
      } catch (error) {
        console.error("Error al obtener clientes:", error);
        return [];
      }
    },
    obtenerProductos: async () => {
      try {
        // Cambia el puerto '3002' si tu microservicio de productos corre en otro puerto
        const response = await fetch('http://localhost:3002/productos'); 
        return await response.json();
      } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
      }
    },
    obtenerOrdenes: async () => {
      try {
        const response = await fetch('http://localhost:3003/ordenes');
        return await response.json();
      } catch (error) {
        return [];
      }
    },
    obtenerPagos: async () => {
      try {
        const response = await fetch('http://localhost:3004/pagos');
        return await response.json();
      } catch (error) {
        return [];
      }
    },
    verificarInventario: async (_, { productoId }) => {
      try {
        const response = await fetch(`http://localhost:3005/inventario/${productoId}`);
        return await response.json();
      } catch (error) {
        return { _id: "inv_err", productoId, cantidadDisponible: 0 };
      }
    },
  },
  Mutation: {
    login: async (_, { correo, clave }) => {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, clave })
      });
      return await response.json();
    },
    crearOrden: async (_, { clienteId, total }) => {
      const response = await fetch('http://localhost:3003/ordenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clienteId, total })
      });
      return await response.json();
    },
    procesarPago: async (_, { orderId, monto, metodoPago }) => {
      const response = await fetch('http://localhost:3004/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, monto, metodoPago })
      });
      return await response.json();
    }
  }
};

app.listen(8004, () => console.log('Payments Service corriendo en puerto 8004'));