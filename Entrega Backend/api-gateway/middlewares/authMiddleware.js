const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:8000';
const AUTH_INTROSPECTION_SECRET = process.env.AUTH_INTROSPECTION_SECRET || 'demo-introspection-secret';

const authenticateClient = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: "No se proporcionó un token de autorización, Bearer token requerido"
            });
        }

        const token = authHeader.split(' ')[1];

        // Llamada al microservicio de autenticación para introspección del token
        const response = await axios.post(
            `${AUTH_SERVICE_URL}/introspect`,
            { token },
            {
                headers: {
                    'X-Gateway-Auth-Secret': AUTH_INTROSPECTION_SECRET
                },
                timeout: 5000
            }
        );

        const identity = response.data;

        if (!identity.active) {
            return res.status(401).json({ error: "Token inválido o expirado" });
        }

        // Adjuntar contexto verificado a la solicitud para retransmitirlo al upstream
        req.userContext = {
            userId: identity.user_id,
            username: identity.username,
            roles: identity.roles,
            clientId: "pasteleria-app",
            backendSecret: "gateway-api-secret-456" // Secreto compartido con el backend interno
        };

        next();
    } catch (error) {
        if (error.code === 'ECONNREFUSED' || error.response?.status === 503) {
            return res.status(503).json({ error: "Servicio de autenticación no disponible" });
        }
        return res.status(502).json({ error: "Error consultando Authentication Service" });
    }
};

const verifyGatewaySecret = (req, res, next) => {
    const gatewaySecret = req.headers['x-gateway-secret'];
    const expectedSecret = 'gateway-api-secret-456';

    if (!gatewaySecret || gatewaySecret !== expectedSecret) {
        return res.status(403).json({ error: "Acceso denegado: Gateway no autorizado" });
    }
    next();
};

module.exports = { authenticateClient, verifyGatewaySecret };