const ProductoServicio= require ('../Servicios/Productos.Servicio');
const ObtenerProductos = (req,res) => {
    try{ 
        const Productos = ProductoServicio.ObtenerProductos();
        res.status(200).json(Productos);
    } 
    catch (error){
        res.status(500).json({
            mensaje: error.message
        });
    }
};

const ObtenerIdProducto = (req,res) => {
    try{
        const Producto = ProductoServicio.ObtenerIdProducto(
        req.params.id
        );
    if (!Producto){
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }
    res.status(200).json(Producto);
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

const CrearProducto =(req,res) =>{
    try{
        const Producto = ProductoServicio.CrearProducto(req.body);
        res.status(201).json(Producto);
    } catch(error){
        res.status(400).json ({
            mensaje: error.message
        });
    }
};
 
const ActualizarProducto = (req, res) => {
    try{
        const Producto = ProductoServicio.ActualizarProducto(
            req.params.id,
            req.body
        );
        res.status(200).json(Producto);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
};

const EliminarProducto =(req, res) => {
   try{
    const Resultado = ProductoServicio.EliminarProducto(
        req.params.id
    );
    res.status(200).json(Resultado);
    } catch (error){
    res.status(400).json({
        mensaje: error.message
    });
    };
};
module.exports = {
    ObtenerProductos,
    ObtenerIdProducto,
    CrearProducto,
    ActualizarProducto,
    EliminarProducto
};