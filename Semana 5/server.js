const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const Usuario = require('./models/usuario');
const Producto = require('./models/producto');
console.log(typeof Usuario);
console.log(Usuario);
mongoose.connect('mongodb://localhost:27017/bdunab2');

const typeDefs = gql`
    enum Rol {
        ADMIN
        CLIENTE
    }
    type Usuario{
        nombre: String!
        pass: String!
        rol: Rol!
    }
    input UsuarioInput{
        nombre: String!
        pass: String!
        rol: Rol!
    }
    type Producto{
        nombre: String!
        descripcion: String!
        precio: Float!
        stock: Int!
        imagen: String
    }

    input ProductoInput{
        nombre: String!
        descripcion: String!
        precio: Float!
        stock: Int!
        imagen: String
    }
    type Alert{
        message: String
    }
    type Query{
    
        getUsuarios: [Usuario]
        getUsuariosById(id: ID!): Usuario
        login(
            nombre: String!,
            pass: String!
            ): Usuario
        getProductos: [Producto]
    }
    type Mutation{
        addUsuario(input: UsuarioInput): Usuario
        updUsuario(id: ID!, input: UsuarioInput): Usuario
        delUsuario(id: ID!): Alert
        addProducto(input: ProductoInput): Producto
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

        async login(obj, { nombre, pass }) {
            const usuario = await Usuario.findOne({
                nombre,
                pass
            });

            return usuario;
        },
        async getProductos() {
        const productos = await Producto.find();
        return productos;
        },

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

        async updUsuario(obj, { id, input }) {
            const usuario = await Usuario.findByIdAndUpdate(
                id,
                input,
                { new: true }
            );

            return usuario;
        },
            async addProducto(obj, { input }) {
            const producto = new Producto(input);
            await producto.save();
            return producto;
        },

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