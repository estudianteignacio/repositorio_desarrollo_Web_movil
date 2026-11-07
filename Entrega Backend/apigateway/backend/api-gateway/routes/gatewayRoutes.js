const express = require('express');
const axios = require('axios');
const router = express.Router();
const { authenticateClient } = require('../middlewares/authMiddleware');

const ORDERS_URL = process.env.ORDERS_URL || 'http://localhost:9000';
const PAYMENTS_URL = process.env.PAYMENTS_URL || 'http://localhost:9100';

// Función auxiliar genérica para hacer el proxy hacia los microservicios internos
const forwardRequest = async (req, res, targetBaseUrl, originalPath) => {
    try {
        const targetUrl = `${targetBaseUrl}${originalPath}`;
        
        const gatewayHeaders = {
            'X-Gateway-Secret': req.userContext.backendSecret,
            'X-Authenticated-Client': req.userContext.clientId,
            'X-Authenticated-User': req.userContext.username,
            'X-Authenticated-Roles': JSON.stringify(req.userContext.roles)
        };

        if (req.headers['content-type']) {
            gatewayHeaders['Content-Type'] = req.headers['content-type'];
        }

        const upstreamResponse = await axios({
            method: req.method,
            url: targetUrl,
            params: req.query,
            data: req.body,
            headers: gatewayHeaders,
            validateStatus: () => true // Permite capturar cualquier código de estado del backend
        });

        res.status(upstreamResponse.status).set(upstreamResponse.headers).send(upstreamResponse.data);
    } catch (error) {
        res.status(502).json({ error: "Backend privado no disponible o error de red" });
    }
};

// Rutas Proxy para Orders Service
router.all('/orders*', authenticateClient, async (req, res) => {
    const subPath = req.originalUrl.replace('/api', ''); // Mapea /api/orders a /orders
    await forwardRequest(req, res, ORDERS_URL, subPath);
});

// Rutas Proxy para Payments Service
router.all('/payments*', authenticateClient, async (req, res) => {
    const subPath = req.originalUrl.replace('/api', ''); // Mapea /api/payments a /payments
    await forwardRequest(req, res, PAYMENTS_URL, subPath);
});

module.exports = router;