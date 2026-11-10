const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const mongoose = require('mongoose');

// 1. CONEXIÓN A BASE DE DATOS MONGODB
const MONGO_URI = 'mongodb://localhost:27017/bdunab2'; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado exitosamente a bdunab2'))
  .catch(err => console.error('Error conectando a MongoDB:', err));


// MODELOS DE MONGOOSE (bdunab2)
const Cliente = mongoose.model('Cliente', new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  telefono: String,
  rol: String
}, { collection: 'usuarios' }));

const Producto = mongoose.model('Producto', new mongoose.Schema({
  nombre: String,
  precio: Number,
  stock: Number,
  categoria: String
}, { collection: 'productos' }));

const Order = mongoose.model('Order', new mongoose.Schema({
  clienteEmail: String,
  total: Number,
  estado: String,
  metodoPago: String
}, { collection: 'pedidos' }));

const Payment = mongoose.model('Payment', new mongoose.Schema({
  orderId: String,
  monto: Number,
  estado: String
}, { collection: 'pagos' })); 

// ESQUEMA GRAPHQL
const typeDefs = `#graphql
  type Cliente {
    _id: String
    nombre: String
    apellido: String
    correo: String
  }

  type Producto {
    _id: String
    nombre: String
    precio: Float
  }

  type Order {
    _id: String
    clienteEmail: String
    total: Float
    estado: String
  }

  type Payment {
    _id: String
    orderId: String
    monto: Float
    estado: String
  }

  type InventoryItem {
    _id: String
    productoId: String
    cantidadDisponible: Int
  }

  type Query {
    obtenerClientes: [Cliente]
    obtenerProductos: [Producto]
    obtenerOrdenes: [Order]
    obtenerPagos: [Payment]
    verificarInventario(productoId: String): InventoryItem
  }
`;

// RESOLVERS
const resolvers = {
  Query: {
    obtenerClientes: async () => {
      try { return await Cliente.find(); } 
      catch (error) { console.error(error); return []; }
    },
    obtenerProductos: async () => {
      try { return await Producto.find(); } 
      catch (error) { console.error(error); return []; }
    },
    obtenerOrdenes: async () => {
      try { return await Order.find(); } 
      catch (error) { console.error(error); return []; }
    },
    obtenerPagos: async () => {
      try { return await Payment.find(); } 
      catch (error) { console.error(error); return []; }
    },
    verificarInventario: async (_, { productoId }) => {
      // Retorna un mock estático ya que no hay colección de inventario en bdunab2
      return { _id: "inv_01", productoId, cantidadDisponible: 50 };
    }
  }
};

// INICIALIZACIÓN DEL SERVIDOR
async function startServer() {
  const app = express();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  app.listen(4000, () => {
    console.log(`GraphQL Gateway listo en http://localhost:4000/graphql`);
  });
}

startServer();