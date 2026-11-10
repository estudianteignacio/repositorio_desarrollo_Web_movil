const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "sk_jwt_unab_auth_key_2026";
const INTERNAL_SECRET = process.env.INTERNAL_GATEWAY_SECRET || "sk_live_unab_gateway_secure_token_2026";

// Middleware de seguridad Service-to-Service
const verificarSecreto = (req, res, next) => {
  if (req.headers['x-gateway-secret'] !== INTERNAL_SECRET) {
    return res.status(403).json({ error: "Acceso denegado: Se requiere credencial interna válida." });
  }
  next();
};

// Generar Token JWT
app.post('/auth/token', verificarSecreto, (req, res) => {
  const { id, correo, rol } = req.body;
  if (!id || !correo) return res.status(400).json({ error: "Datos del usuario requeridos" });

  const token = jwt.sign(
    { sub: id, correo, rol: rol || "CLIENTE" },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
  res.json({ token, expiresIn: 7200 });
});

// Verificar Token JWT
app.post('/auth/verify', verificarSecreto, (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, payload: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: "Token inválido o expirado" });
  }
});

app.listen(8000, () => console.log('Auth Service corriendo en puerto 8000'));