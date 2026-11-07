const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 9100;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bdunab2';

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Payments Service conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Ruta Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'Payments Service' });
});

// Rutas de Pagos
app.use('/payments', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Payments Service ejecutándose en el puerto ${PORT}`);
});