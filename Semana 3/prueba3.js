//Creación de elementos en html, con JavaScript

//limpiar body
document.body.innerHTML = "";

//crear título
let titulo = document.createElement("h2");

titulo.innerText = "Ejemplo de creación de elementos via JavaScript";
document.body.appendChild(titulo);

//crear cuadro de texto
let subtitulo = document.createElement("h3");
subtitulo.innerText = "Cambiar texto via input y mostrar objetos"
document.body.appendChild(subtitulo);

let texto = document.createElement("input");

texto.setAttribute("type", "text");
texto.setAttribute("value", "Hola Mundo");
texto.setAttribute("name", "txtMensaje");
texto.setAttribute("id", "txtMensaje");

document.body.appendChild(texto);

document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

//simulación de respuesta de una API
const responseAPI = {
    "status": 200,
    "message": "Productos Obtenidos",
    "data": [
        {
            "id": "1", 
            "nombre": "Auto",
            "precio": 1000,
            "tipo": "terrestre"
        },

        {
            "id": "2",
            "nombre": "Camion",
            "precio": 2000,
            "tipo": "terrestre"
        },

        {
            "id": "3",
            "nombre": "Tren",
            "precio": 3000,
            "tipo": "ferroviario"
        },

        {
            "id": "4",
            "nombre": "Avion",
            "precio": 4000,
            "tipo": "aéreo"
        }
    ]
};

//creación de select
let seleccion = document.createElement("select");
seleccion.setAttribute("name", "seleccion");
seleccion.setAttribute("id", "seleccion");

//opcion inicial
let opcionInicial = document.createElement("option");
opcionInicial.setAttribute("value", "");
opcionInicial.innerText = "Seleccione un producto"; 
seleccion.appendChild(opcionInicial);

//recorrer productos de la API

responseAPI.data.forEach((producto) => {

    let optionAux = document.createElement("option");

    //el value guarda el ID
    optionAux.setAttribute("value", producto.id);

    //mostramos nombre y precio
    optionAux.innerText = producto.nombre; 

    //agregar option al select
    seleccion.appendChild(optionAux);
});


//agregar select al documento
document.body.appendChild(seleccion);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

//creación de button
let boton = document.createElement("button");
boton.innerText = "Mostrar selección";
document.body.appendChild(boton);

//mostrar resultado
let resultado = document.createElement("p");
document.body.appendChild(resultado);

//evento de presionar el boton
boton.addEventListener("click",() => 
    {
        // Obtener texto escrito
        let mensaje = texto.value;

        // Obtener ID seleccionado
        let idSeleccionado = seleccion.value;

        // Verificar que se haya seleccionado algo
        if (idSeleccionado === "") {
            resultado.innerText = "Seleccione un producto por favor.";
        } else {

            // Buscar el producto según su ID
            let productoSeleccionado = responseAPI.data.find((producto) =>
                        producto.id === idSeleccionado);

            // Mostrar los datos
            resultado.innerText = "Texto: " + mensaje +
                " | ID: " +
                productoSeleccionado.id +
                " | Producto: " +
                productoSeleccionado.nombre +
                " | Precio: $" +
                productoSeleccionado.precio +
                " | tipo: " +
                productoSeleccionado.tipo;
        }
    }
);

// Orientación a objectos con JavaScript


// Crear un objeto producto

const producto = {
    id: "1",
    nombre: "Auto",
    precio: 1000,
    tipo: "terrestre"
};

console.log("Producto original:");
console.log(producto);

//acceder a propiedades
console.log(producto.nombre);
console.log(producto.precio);

//también podemos utilizar []
console.log(producto["nombre"]);

//agregar una nueva propiedad
producto.cantidad = 20;
console.log("Producto cantidad:");
console.log(producto);


//modificar una propiedad
producto.precio = 1600;

console.log("Producto con nuevo precio:");
console.log(producto);

//eliminar una propiedad
delete producto.cantidad;
console.log("Producto después de eliminar cantidad:");
console.log(producto);

//spread Operator
const productoActualizado = {
    ...producto,
    oferta: true,
    descuento: 10
};

console.log("Producto actualizado:");
console.log(productoActualizado);

//crear otro objeto
const proveedor = {
    nombreProveedor: "Transportes del Norte",
    ciudad: "Valparaíso"
};

console.log("Proveedor:");
console.log(proveedor);

//fusionar objetos con Object.assign
const fusion = Object.assign(
    {}, 
    productoActualizado,
    proveedor
);

console.log("Fusión con Object.assign:");
console.log(fusion);

//fusionar utilizando Spread
const fusionSpread = {
    ...productoActualizado,
    ...proveedor
};

console.log("Fusión utilizando Spread:");
console.log(fusionSpread);

//composición
const composicion = {
    productoActualizado,
    proveedor
};

console.log("Composición:");
console.log(composicion);

//acceder a objetos internos
console.log(composicion.productoActualizado.nombre);
console.log(composicion.proveedor.nombreProveedor);

//for...in
console.log("Recorrido con for...in:");

for (let propiedad in productoActualizado) {
    console.log(propiedad, productoActualizado[propiedad]);
}

//Object.keys()
console.log("Claves:");
Object.keys(productoActualizado).forEach((clave) => {
    console.log(clave);
});

//Object.values()
console.log("Valores:");
Object.values(productoActualizado).forEach((valor) => {
    console.log(valor);
});

//Object.entries()
console.log("Claves y valores:");
Object.entries(productoActualizado).forEach(([clave, valor]) => {
        console.log(`Clave: ${clave}, Valor: ${valor}`);
    }
);

//recorrer objetos dentro de otros objetos
console.log("Recorrido de la composición:");
Object.entries(composicion).forEach(([nombreObjeto, objetoInterno]) => {
        console.log("Objeto:",nombreObjeto);
        Object.entries(objetoInterno).forEach(([clave, valor]) => {
                console.log(`${clave}: ${valor}`);
            }
        );
    }
);