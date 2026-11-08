const express = require ('express');
const app = express();
const RutasProducto = require(
    '../Rutas/rutas.producto'
);
app.use(express.json());
app.use(RutasProducto);
app.listen(3001, () => {
    console.log('Inventory funcionando en puerto 3001');
});
