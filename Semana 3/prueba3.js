//Creación de elementos en html, con JavaScript

//limpiar body
document.body.innerHTML = "";

//crear título
let titulo = document.createElement("h2");

encabezado.innerText = "Ejemplo de creación de elementos via JavaScript";
document.body.appendChild(encabezado);

//generar campo para escribir
let descripcion = document.createElement("h3");
descripcion.innerText = "Cambiar texto via input y mostrar objetos"
document.body.appendChild(descripcion);

let entrada = document.createElement("input");

entrada.setAttribute("type", "text");
entrada.setAttribute("value", "Hola Mundo");
entrada.setAttribute("name", "txtMensaje");
entrada.setAttribute("id", "txtMensaje");

document.body.appendChild(entrada);

document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

//datos simulados recibidos desde una API
const datosAPI = {
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


//crear lista desplegable
let listaProductos = document.createElement("select");
listaProductos.setAttribute("name", "seleccion");
listaProductos.setAttribute("id", "seleccion");

//opción por defecto
let primeraOpcion = document.createElement("option");
primeraOpcion.setAttribute("value", "");
primeraOpcion.innerText = "Seleccione un producto"; 
listaProductos.appendChild(primeraOpcion);

//pasar por cada producto disponible
datosAPI.data.forEach((producto) => {

    let nuevaOpcion = document.createElement("option");

    //guardar el identificador en value
    nuevaOpcion.setAttribute("value", producto.id);

    //indicar el producto en la opción
    nuevaOpcion.innerText = producto.nombre; 

    //incorporar la opción a la lista
    listaProductos.appendChild(nuevaOpcion);
});

//añadir la lista al documento
document.body.appendChild(listaProductos);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));

//generar botón de acción
let btnMostrar = document.createElement("button");
btnMostrar.innerText = "Mostrar selección";
document.body.appendChild(btnMostrar);

//preparar espacio para el resultado
let salida = document.createElement("p");
document.body.appendChild(salida);

//evento al hacer clic
btnMostrar.addEventListener("click",() => 
    {
        //leer el contenido del input
        let mensaje = entrada.value;

        //leer el ID elegido
        let idSeleccionado = listaProductos.value;

        //comprobar que exista una selección
        if (idSeleccionado === "") {
            salida.innerText = "Seleccione un producto por favor.";
        } else {

            //localizar el producto mediante su ID
            let productoElegido = datosAPI.data.find((producto) =>
                        producto.id === idSeleccionado);

            //presentar la información obtenida
            salida.innerText = "Texto: " + mensaje +
                " | ID: " +
                productoElegido.id +
                " | Producto: " +
                productoElegido.nombre +
                " | Precio: $" +
                productoElegido.precio +
                " | tipo: " +
                productoElegido.tipo;
        }
    }
);
//titulo de la tabla
let tituloTabla = document.createElement("h3");
tituloTabla.innerText = "Tabla de Productos";
document.body.appendChild(tituloTabla);

//crear tabla
let tabla = document.createElement("table");
tabla.setAttribute("border", "1");
//cabeza
tabla.innerHTML = `
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Tipo</th>
        </tr>
    </thead>
`;

//cuerpo de la tabla
let tbody = document.createElement("tbody");

responseAPI.data.forEach(producto => {

    let fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.tipo}</td>
    `;

    tbody.appendChild(fila);
});

tabla.appendChild(tbody);
document.body.appendChild(tabla);


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
console.log(articulo.nombre);
console.log(articulo.precio);

//también podemos utilizar []
console.log(articulo["nombre"]);

//agregar una nueva propiedad
articulo.cantidad = 20;
console.log("Producto cantidad:");
console.log(articulo);


//modificar una propiedad
articulo.precio = 1600;

console.log("Producto con nuevo precio:");
console.log(articulo);

//eliminar una propiedad
delete articulo.cantidad;
console.log("Producto después de eliminar cantidad:");
console.log(articulo);

//operador Spread
const articuloActualizado = {
    ...articulo,
    oferta: true,
    descuento: 10
};

console.log("Producto actualizado:");
console.log(articuloActualizado);

//definir un segundo objeto
const distribuidor = {
    nombreProveedor: "Logística del Pacífico",
    ciudad: "Concepción"
};

console.log("Proveedor:");
console.log(distribuidor);

//combinar objetos mediante Object.assign
const fusion = Object.assign(
    {}, 
    articuloActualizado,
    distribuidor
);

console.log("Fusión con Object.assign:");
console.log(fusion);

//combinar usando Spread
const mezclaSpread = {
    ...articuloActualizado,
    ...distribuidor
};

console.log("Fusión utilizando Spread:");
console.log(mezclaSpread);

//crear una composición de objetos
const conjunto = {
    articuloActualizado,
    distribuidor
};

console.log("Composición:");
console.log(conjunto);

//consultar propiedades de objetos internos
console.log(conjunto.articuloActualizado.nombre);
console.log(conjunto.distribuidor.nombreProveedor);

//recorrido mediante for...in
console.log("Recorrido con for...in:");

for (let propiedad in articuloActualizado) {
    console.log(propiedad, articuloActualizado[propiedad]);
}

//obtener las claves con Object.keys()
console.log("Claves:");
Object.keys(articuloActualizado).forEach((clave) => {
    console.log(clave);
});

//obtener los valores con Object.values()
console.log("Valores:");
Object.values(articuloActualizado).forEach((valor) => {
    console.log(valor);
});

//obtener pares clave-valor con Object.entries()
console.log("Claves y valores:");
Object.entries(articuloActualizado).forEach(([clave, valor]) => {
        console.log(`Clave: ${clave}, Valor: ${valor}`);
    }
);

//recorrer los objetos contenidos en otro objeto
console.log("Recorrido de la composición:");
Object.entries(conjunto).forEach(([nombreObjeto, objetoInterno]) => {
        console.log("Objeto:",nombreObjeto);
        Object.entries(objetoInterno).forEach(([clave, valor]) => {
                console.log(`${clave}: ${valor}`);
            }
        );
    }
);