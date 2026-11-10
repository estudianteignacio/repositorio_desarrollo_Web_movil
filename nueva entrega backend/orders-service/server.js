const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Pedido = require('./models/pedidos');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB local
mongoose.connect('mongodb://localhost:27017/bdunab2')
    .then(() => console.log('>>> [Orders Service] Conectado a MongoDB local'))
    .catch(err => console.error(err));

// CAPTURA Y VALIDACIÓN DEL SECRETO (Service-to-Service)
const INTERNAL_SECRET_KEY = process.env.INTERNAL_GATEWAY_SECRET || "sk_live_unab_gateway_secure_token_2026";
const verificarSecretoGateway = (req, res, next) => {
    const secretHeader = req.headers['x-gateway-secret'];
    if (!secretHeader || secretHeader !== INTERNAL_SECRET_KEY) {
        return res.status(403).json({ error: "Acceso Denegado: Se requiere credencial de integración válida. Prohibido acceso directo." });
    }
    next();
};

// Endpoints protegidos obligatoriamente por el secreto
app.get('/orders', verificarSecretoGateway, async (req, res) => {
    try {
        const pedidos = await Pedido.find().sort({ createdAt: -1 });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/orders', verificarSecretoGateway, async (req, res) => {
    try {
        const nuevo = new Pedido(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar pedido por ID (PUT - Ej: actualizar estado o método de pago)
app.put('/orders/:id', async (req, res) => {
  try {
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!pedidoActualizado) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar / Anular pedido por ID (DELETE)
app.delete('/orders/:id', async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json({ mensaje: 'Pedido eliminado / anulado correctamente', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8003, () => console.log('Orders Service corriendo en puerto 8003'));