const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Football Player Management API',
            version: '1.0.0',
            description: 'This API was developed to manage football players, allowing CRUD (creation, reading, updating and deleting) operations on player data.'
        },
    },
    apis: ['./routes/*.js'], // path to route files
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;