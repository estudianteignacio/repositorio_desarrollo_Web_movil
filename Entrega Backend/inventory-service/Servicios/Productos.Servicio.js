const ProductoModelo = require ('../Modelo Producto/Producto');
const Productos = [];
const ObtenerProductos = () => {
    return Productos;
};
const ObtenerIdProducto = (id) =>{
    return Productos.find (
        Producto => Producto.id ===Number(id) 
    );
};
const CrearProducto = (Datos) => {
    if(!Datos.nombre || Datos.nombre.trim() === "") {
        throw new Error (" El nombre es obligatorio");
    }
    if(!Datos.descripcion || Datos.descripcion.trim() === ""){
        throw new Error ("La descripcion es obligatoria");     
    }
    if (Datos.precio === undefined || Datos.precio <= 0 ){
        throw new Error("El precio debe ser valido");
    }
    if (Datos.stock === undefined || Datos.stock < 0){
        throw new Error("El stock no puede ser negativo");
    }
    if (!Datos.categoria || Datos.categoria.trim() === "") {
        throw new Error ("la categoria es obligatoria");
    }
    const Producto = new ProductoModelo (
        Datos.id,
        Datos.nombre,
        Datos.descripcion,
        Datos.precio,
        Datos.stock,
        Datos.categoria,
        Datos.imagen,
        Datos.porciones,
        Datos.disponible
    );

    Productos.push(Producto);
    return Producto;
};

const ActualizarProducto = (id,Datos) => {
    const ProductoEncontrado = Productos.find(
        producto => producto.id === Number(id)
    );
    if (!ProductoEncontrado){
        throw new Error ("Producto no encontrado");
    }
    if(Datos.nombre !== undefined && Datos.nombre.trim() === "") {
        throw new Error ("El nombre no puede estar vacio");
    }
    if(Datos.precio !== undefined && Datos.precio <= 0){
        throw new Error ("El precio debe ser mayor a 0");
    }
    if (Datos.stock !== undefined && Datos.stock < 0){
        throw new Error ("El stock no puede ser negativo");
    }
    Object.assign(ProductoEncontrado, Datos);
    return ProductoEncontrado;
};
const EliminarProducto = (id) => {
    if (!id){
        throw new Error ("el id es obligatorio");
    }
    const Indice = Productos.findIndex(
        Producto => Producto.id === Number (id)
    );
    if(Indice === -1){
        throw new Error ("Producto no encontrado"); 
    }
    Productos.splice(Indice,1);
    return{
        mensaje: "Producto eliminado correctamente" 
    };
};
module.exports = {ObtenerProductos,ObtenerIdProducto,CrearProducto,ActualizarProducto,EliminarProducto};