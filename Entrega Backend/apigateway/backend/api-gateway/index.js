const express = require('express');
const cors = require('cors');
const gatewayRoutes = require('./routes/gatewayRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Health check del Gateway
app.get('/gateway-health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        service: 'API Gateway Pasteleria'
    });
});

// Montar las rutas del Gateway bajo el prefijo /api
app.use('/api', gatewayRoutes);

app.listen(PORT, () => {
    console.log(`API Gateway ejecutándose en el puerto ${PORT}`);
});