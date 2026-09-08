const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { ApolloServer, gql } = require('apollo-server-express');
const Usuario = require('./models/usuario');

console.log(typeof Usuario);
console.log(Usuario);

mongoose.connect('mongodb://localhost:27017/bdunab2');

const typeDefs = gql`
    type Usuario{
        nombre: String!
        pass: String!
    }

    input UsuarioInput{
        nombre: String!
        pass: String!
    }

    type Alert{
        message: String
    }

    type Query{
        getUsuarios: [Usuario]
        getUsuariosById(id: ID!): Usuario
    }

    type Mutation{
        addUsuario(input: UsuarioInput): Usuario
        updUsuario(id: ID!, input: UsuarioInput): Usuario
        delUsuario(id: ID!): Alert
    }
`;

const resolvers = {
    Query: {

        async getUsuarios(obj) {
            const usuarios = await Usuario.find();
            return usuarios;
        },

        async getUsuariosById(obj, { id }) {
            const usuarioBus = await Usuario.findById(id);

            if (usuarioBus == null) {
                return null;
            } else {
                return usuarioBus;
            }
        },


        async getProductos(obj) {
            const productos = await Producto.find();
            return productos;
        },

        async getProductoById(obj, { id }) {
            const productoBus = await Producto.findById(id);

            if (productoBus == null) {
                return null;
            } else {
                return productoBus;
            }
        },

        async getPedidos(obj) {
            const pedidos = await Pedido.find();
            return pedidos;
        },

        async getPedidoById(obj, { id }) {
            const pedidoBus = await Pedido.findById(id);

            if (pedidoBus == null) {
                return null;
            } else {
                return pedidoBus;
            }
        }
    },

    Mutation: {

        async addUsuario(obj, { input }) {

            const usuario = new Usuario(input);

            await usuario.save();

            return usuario;
        },

        async delUsuario(obj, { id }) {
            await Usuario.deleteOne({ _id: id });

            return {
                message: "Usuario Eliminado"
            };
        },

        async addProducto(obj, { input }) {

            const producto = new Producto(input);

            await producto.save();
            
            return producto;
        },

        async delProducto(obj, { id }) {
            await Producto.deleteOne({ _id: id });

            return {
                message: "Producto Eliminado"
            };
        },


        async addPedido(obj, { input }) {

            const pedido = new Pedido(input);

            await pedido.save();

            return pedido;
        },

        async delPedido(obj, { id }) {
            await Pedido.deleteOne({ _id: id });

            return {
                message: "Pedido Eliminado"
            };
        }

    }
};

let apolloServer = null;

const corsOption = {
    origin: "http://localhost:8090",
    credentials: false
};

const app = express();

async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
}

startServer();

app.use(cors());

app.listen(8090, function() {
    console.log("Graphql Iniciado");
});