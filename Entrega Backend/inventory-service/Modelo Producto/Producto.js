class Producto {
    constructor(
        id,
        nombre,
        descripcion,
        precio,
        stock,
        categoria,
        imagen,
        porciones,
        disponible,
    ){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.imagen = imagen;
        this.porciones = porciones;
        this.disponible = disponible;
    }
}
module.exports = Producto;