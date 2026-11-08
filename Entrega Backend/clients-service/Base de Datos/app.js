const express = require('express');
const app= express();
const RutasCliente = require(
    '../Rutas/rutas.cliente'
);
app.use(express.json());
app.use(RutasCliente);
app.listen(3002, () => {
    console.log('Clients funcionando en puerto 3002');
});