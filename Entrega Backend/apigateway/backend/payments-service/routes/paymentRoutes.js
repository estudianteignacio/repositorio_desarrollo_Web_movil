const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.listar);
router.post('/', paymentController.procesar);
router.get('/:id', paymentController.obtenerPorId);

module.exports = router;