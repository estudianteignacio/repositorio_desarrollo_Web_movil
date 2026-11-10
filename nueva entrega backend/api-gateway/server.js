const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// URLs de los Microservicios Privados y Agregadores
const AUTH_URL = 'http://localhost:8000';
const CLIENTS_URL = 'http://localhost:8001';
const INVENTORY_URL = 'http://localhost:8002';
const ORDERS_URL = 'http://localhost:8003';
const PAYMENTS_URL = 'http://localhost:8004';
const GRAPHQL_URL = 'http://localhost:4000/graphql';

// Secreto de integración corporativo (Service-to-Service)
const GATEWAY_SECRET_KEY = process.env.INTERNAL_GATEWAY_SECRET || "sk_live_unab_gateway_secure_token_2026";

/**
 * Función genérica de reenvío (Reverse Proxy con inyección de secreto y manejo seguro de respuestas)
 */
const forwardRequest = async (baseUrl, req, res) => {
  try {
    // Política de seguridad: Eliminar cualquier intento externo de inyectar roles
    delete req.headers['x-internal-role'];

    // Construir la URL de destino omitiendo '/api/v1'
    const targetUrl = baseUrl + req.originalUrl.replace('/api/v1', '');

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'x-gateway-secret': GATEWAY_SECRET_KEY, // INYECCIÓN OBLIGATORIA DEL SECRETO
        'x-gateway-validated': 'true'
      },
      body: ['GET', 'DELETE'].includes(req.method) ? undefined : JSON.stringify(req.body)
    });

    // Validar el tipo de contenido para evitar errores si el microservicio responde con HTML (404/500)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const textData = await response.text();
      res.status(response.status).json({ 
        error: `El microservicio respondió con estado ${response.status} y formato no JSON`, 
        details: textData.substring(0, 150) 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Gateway Connection Error: Microservicio privado inaccesible o error de red.', 
      details: error.message 
    });
  }
};


// ENRUTAMIENTO DEL API GATEWAY
// 1. Auth Service
app.all('/api/v1/auth*', (req, res) => forwardRequest(AUTH_URL, req, res));

// 2. Clients Service
app.all('/api/v1/clients*', (req, res) => forwardRequest(CLIENTS_URL, req, res));

// 3. Inventory Service
app.all('/api/v1/products*', (req, res) => forwardRequest(INVENTORY_URL, req, res));

// 4. Orders Service
app.all('/api/v1/orders*', (req, res) => forwardRequest(ORDERS_URL, req, res));

// 5. Payments Service
app.all('/api/v1/payments*', (req, res) => forwardRequest(PAYMENTS_URL, req, res));

// 6. GraphQL Gateway
app.all('/api/v1/graphql', (req, res) => forwardRequest(GRAPHQL_URL, req, res));


// MÓDULO DE GESTIÓN Y AUDITORÍA DE SECRETOS (Vault)
app.get('/api/v1/secrets', (req, res) => {
  res.json([
    { referencia: 'webpay-secret-key', emisor: 'Transbank Test', consumidor: 'payments-service', finalidad: 'Autorización de pagos seguros', ubicacionSegura: 'Vault / Environment', activo: true },
    { referencia: 'jwt-auth-secret', emisor: 'HashiCorp Vault', consumidor: 'auth-service', finalidad: 'Firma y validación de tokens JWT', ubicacionSegura: 'Vault KV Store', activo: true },
    { referencia: 'internal-gateway-secret', emisor: 'Vault Security', consumidor: 'all-microservices', finalidad: 'Validación Service-to-Service', ubicacionSegura: 'Environment Variables', activo: true }
  ]);
});

// Ruta de Salud del Gateway
app.get('/health-gateway', (req, res) => {
  res.json({ status: 'API Gateway Unificado Operando con Seguridad Service-to-Service' });
});

const PORT = 8090;
app.listen(PORT, () => {
  console.log(`API Gateway Unificado con Soporte Total en http://localhost:${PORT}`);
});