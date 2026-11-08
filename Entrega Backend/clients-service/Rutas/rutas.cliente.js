const express = require('express');
const router = express.Router();
const ClientesController = require(
    '../Controladores/controladores.cliente'
);
router.get(
    '/clientes',
    ClientesController.ObtenerClientes
);
router.get(
    '/clientes/:id',
    ClientesController.ObtenerIdCliente
);
router.post(
    '/clientes',
    ClientesController.CrearCliente
);
router.put(
    '/clientes/:id',
    ClientesController.ActualizarCliente
)
router.delete(
    '/clientes/:id',
    ClientesController.EliminarCliente
);
module.exports = router;