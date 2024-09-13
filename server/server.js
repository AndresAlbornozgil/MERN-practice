const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

// We need to CREATE and CONNECT our typeDefs and Resolvers
const { typeDefs, resolvers } = require('./schemas/');

const server = new ApolloServer({
    // Here we need to import typeDefs & resolvers
    typeDefs,
    resolvers
})

const db = require('./config/connection');

const { Food } = require('./models/Food');

const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
    await server.start();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server));

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Connected to localhost://${PORT}`);
        });
    });
};

startApolloServer();

// Continue watching video in minute 56:30
