const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const db = require('./config/connection');
// We need to CREATE and CONNECT our typeDefs and Resolvers
const { typeDefs, resolvers } = require('./schemas/');

const server = new ApolloServer({
    // Here we need to import typeDefs & resolvers
    typeDefs,
    resolvers
})

const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
    await server.start();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use('/graphql', expressMiddleware(server));

    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
    };

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Connected to localhost://${PORT}`);
        });
    });
};

startApolloServer();

// Not deployed yet -- How to deploy using Render & MongoDB Atlas in hour 1:01 minute of video tutorial

// Continue watching video in hour 1:33 minute
