const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nursery API",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                name: "Abo_Esam"
            },
        }

    },
    apis: ['./*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = (server) => {
    server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}