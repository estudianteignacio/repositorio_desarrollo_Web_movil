const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Producto = require('./models/producto');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB local
mongoose.connect('mongodb://localhost:27017/bdunab2')
    .then(() => console.log('>>> [Inventory Service] Conectado a MongoDB local'))
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
app.get('/products', verificarSecretoGateway, async (req, res) => {
    try {
        const { categoria } = req.query;
        let query = { activo: true };
        if (categoria && categoria !== 'todas') query.categoria = categoria;
        const productos = await Producto.find(query);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/products', verificarSecretoGateway, async (req, res) => {
    try {
        const nuevo = new Producto(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    
    if (!productoEliminado) {
      return res.status(404).json({ error: 'Recurso no encontrado para eliminar' });
    }
    
    res.json({ 
      mensaje: 'Recurso eliminado correctamente', 
      id: req.params.id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8002, () => console.log('Inventory Service corriendo en puerto 8002'));