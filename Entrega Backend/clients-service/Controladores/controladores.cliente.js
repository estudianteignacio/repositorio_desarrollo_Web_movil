const ClienteServicio = require (
    '../Servicios/Cliente.Servicio'
);
const ObtenerClientes = (req,res) => {
    try {
        const Clientes = ClienteServicio.ObtenerClientes();
        res.status(200).json(Clientes);
    } catch (error) {
        res.status(500).json ({
            mensaje: error.message
        });
    }
};
const ObtenerIdCliente =(req, res)=> {
    try{
        const Cliente = ClienteServicio.ObtenerIdCliente(
            req.params.id
        );
        if (!Cliente) {
            return res.status(404).json ({
                mensaje: "Cliente no encontrado"
            });
        }
        res.status(200).json(Cliente);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};
const CrearCliente = (req, res) => {
    try {
        const Cliente = ClienteServicio.CrearCliente(
            req.body
        );
        res.status(201).json(Cliente);
    }catch (error){
        res.status(400).json({
            mensaje:error.message
        });
    }
};

const ActualizarCliente= ( req, res) => {
    try {
        const Cliente= ClienteServicio.ActualizarCliente(
            req.params.id,
            req.body
        );
        res.status(200).json(Cliente);
    } catch (error){
        res.status(400).json({
            mensaje:error.message
        });
    }
};

const EliminarCliente =(req,res) => {
    try {
        const Resultado= ClienteServicio.EliminarCliente( 
            req.params.id
        );
        res.status(200).json(Resultado);
    } catch (error){
        res.status(400).json({
            mensaje: error.message
        });
    }
};

module.exports = {
    ObtenerClientes,
    ObtenerIdCliente,
    CrearCliente,
    ActualizarCliente,
    EliminarCliente
};