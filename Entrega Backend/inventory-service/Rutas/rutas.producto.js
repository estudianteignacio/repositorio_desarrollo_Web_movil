const express = require ('express');
const router = express.Router();
const ProductosController = require(
    '../Controladores/controladores.producto'
);

router.get(
    '/productos',
    ProductosController.ObtenerProductos
);
router.get(
    '/productos/:id',
    ProductosController.ObtenerIdProducto
);
router.post(
    '/productos',
    ProductosController.CrearProducto
);
router.put(
    '/productos/:id',
    ProductosController.ActualizarProducto
);
router.delete(
    '/productos/:id',
    ProductosController.EliminarProducto
);
module.exports = router;

