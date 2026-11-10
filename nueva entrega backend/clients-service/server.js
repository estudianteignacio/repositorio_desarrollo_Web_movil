const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Usuario = require('./models/usuario');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB local
mongoose.connect('mongodb://localhost:27017/bdunab2')
    .then(() => console.log('>>> [Clients Service] Conectado a MongoDB local'))
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
app.get('/clients', verificarSecretoGateway, async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/clients/register', verificarSecretoGateway, async (req, res) => {
    try {
        const nuevo = new Usuario(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/clients/login', verificarSecretoGateway, async (req, res) => {
    try {
        const { correo, pass } = req.body;
        const usuario = await Usuario.findOne({ correo, pass });
        if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.put('/clients/:id', async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(clienteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/clients/:id', async (req, res) => {
  try {
    const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteEliminado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado exitosamente', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8001, () => console.log('Clients Service corriendo en puerto 8001'));