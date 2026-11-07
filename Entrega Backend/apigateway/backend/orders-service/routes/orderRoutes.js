const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.listar);
router.post('/', orderController.crear);
router.get('/:id', orderController.obtenerPorId);
router.put('/:id/estado', orderController.actualizarEstado);

module.exports = router;