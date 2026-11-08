const ClienteModelo =require(
    '../Modelo Cliente/Cliente'
);
const Clientes = [];
const ObtenerClientes= () => {
    return Clientes;
};

const ObtenerIdCliente= (id) => {
    return Clientes.find(
        cliente  => cliente.id === Number(id)
    );   
};
const CrearCliente = (Datos) => {
    if(!Datos.nombre || Datos.nombre.trim() === ""){
        throw new Error ("El nombre es obligatorio");
    }
    if (! Datos.correo || Datos.correo.trim() === ""){
        throw new Error ("El correo es obliogatorio");
    }
    if (!Datos.telefono ||Datos.telefono.trim() === ""){
        throw new Error("El numero de telefono es obligatorio");
    }
    if (!Datos.direccion || Datos.direccion.trim() === "") {
        throw new Error ("La dirrecion es obligatoria");
    }
    const Cliente = new ClienteModelo(
        Datos.id,
        Datos.nombre,
        Datos.correo,
        Datos.telefono,
        Datos.direccion
    );
    Clientes.push (Cliente);
    return Cliente;
};
const ActualizarCliente = (id,Datos) => {
    const ClienteEncontrado = Clientes.find (
        cliente => cliente.id === Number(id)
    );
    if(!ClienteEncontrado)
    {
        throw new Error ("Cliente no encontrado");
    }
    if (Datos.nombre !== undefined && Datos.nombre.trim() === "")
    { 
        throw new Error ("Tienes que ingresar un nombre");
    }
    if ( Datos.correo!== undefined && Datos.correo.trim() === "")
    {
        throw new Error ("Tienes que ingresar un correo");
    }
    if (Datos.telefono !== undefined && Datos.telefono.trim () === "")
    {
        throw new Error ("Tienes que ingresar un telefono de contacto");
    }
    if ( Datos.direccion !== undefined && Datos.direccion.trim() === "")
    { 
        throw new Error ("La dirrecion es obligatoria");
    }
    Object.assign(
        ClienteEncontrado,
        Datos
    );
    return ClienteEncontrado;
};

const EliminarCliente =(id) => {
    if (!id) {
        throw new Error ("El id es oblighatorio");
    }
    const Indice = Clientes.findIndex(
        cliente => cliente.id === Number(id)
    );
    if (Indice === -1){
        throw new Error("CLiente no encontrado");
    }
    Clientes.splice(Indice,1);
    return { mensaje: "Cliente eliminado corerectamente"};
};   
module.exports = {
    ObtenerClientes,
    ObtenerIdCliente,
    CrearCliente,
    ActualizarCliente,
    EliminarCliente
};



   