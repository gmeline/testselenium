const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD Utilisateurs API',
            version: '1.0.0',
            description: 'API simple avec Express, CRUD utilisateurs et Swagger',
        },
    },
    apis: ['./server.js'], // Où Swagger lira les commentaires JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
